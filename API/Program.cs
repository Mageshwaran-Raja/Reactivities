using Application.Activities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Application.Core;
using FluentValidation.AspNetCore;
using API.Middleware;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers().AddFluentValidation(config => 
{
    config.RegisterValidatorsFromAssemblyContaining<Create>();
});

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();



builder.Services.AddDbContext<DataContext>(opt => 
    opt.UseSqlServer(builder.Configuration.GetConnectionString("DatabaseConnection")));


builder.Services.AddMediatR(typeof(List.Handler).Assembly);

builder.Services.AddCors();

builder.Services.AddAutoMapper(typeof(MappingProfile).Assembly);

var app = builder.Build();

app.UseMiddleware<ExceptionMiddleware>();

var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;

try {
    var context = services.GetRequiredService<DataContext>();
    context.Database.Migrate();
    await Seed.SeedData(context);
}
catch(Exception ex) {
    var logger = services.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex, "Error occured during migration");
}





// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors(options => options.WithOrigins("http://localhost:3000/").
    AllowAnyMethod().AllowAnyHeader().AllowAnyOrigin());

app.UseAuthorization();

app.MapControllers();


app.Run();
