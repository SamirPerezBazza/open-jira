# NestJS OpenJira App

Para correr localmente se necesita la base de datos

```
docker-compose up -d
```

-  -d para evitar que enlace con la consola

# MongoDB URL Local

```
mongodb://localhost:27017/entriesdb
```

# Configurar las variables de entorno como se especifica en .env.example

Puedes renombrar el archivo **.env.example** a **.env** y allenar los respectivos datos

## Llenar la base de datos con información de pruebas

Llamar a:

```
mongodb://localhost:3000/api/seed
```
