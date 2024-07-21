# Proyecto de API de Clientes

Este proyecto es una API simple construida con NestJS y TypeORM, utilizando PostgreSQL como base de datos. Proporciona endpoints para gestionar clientes, mensajes y deudas, e incluye integración con OpenAI para generar mensajes automáticamente.

## Requisitos

- [Node.js](https://nodejs.org/) (v18 o superior recomendado)
- [Docker](https://www.docker.com/) y [Docker Compose](https://docs.docker.com/compose/) (para correr los servicios en contenedores)
- [PostgreSQL](https://www.postgresql.org/) (se configura automáticamente con Docker)
- [OpenAI API Key](https://platform.openai.com/signup) (para generar mensajes automáticos)

## Instalación

### 1. Clona el Repositorio

```bash
git clone https://github.com/diegovaldesjr/automotive-leads-management-api.git
cd automotive-leads-management-api
```

### 2. Configuración

### Configuración del Entorno

Crea un archivo `.env` en la raíz del proyecto, aquí un ejemplo:

```
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=yourusername
DATABASE_PASSWORD=yourpassword
DATABASE_NAME=yourdatabase
PORT=3000
OPENAI_API_KEY=your_api_key_openai
```

### 3. Uso

### Construir y Ejecutar Contenedores

Construye y ejecuta los contenedores Docker con Docker Compose:

```bash
docker-compose up --build
```

Esto levantará los siguientes servicios:

- **API** en `http://localhost:3000`
- **PostgreSQL** en `http://localhost:5432`

## Endpoints de la API

### Clientes

- **GET** `/clients`
    
    Devuelve una lista de todos los clientes.
    
- **GET** `/clients/<id>`
    
    Devuelve la información de un cliente específico, incluyendo sus mensajes y deudas.
    
- **POST** `/clients`
    
    Crea un nuevo cliente junto con sus mensajes y deudas.
    
    **Ejemplo de request:**
    
    ```json
    {
      "name": "Juan Perez",
      "rut": "11.111.111-1",
      "messages": [
        {
          "text": "Hola, quiero comprar un auto",
          "sentAt": "2023-12-24T00:00:00.000Z",
          "role": "client"
        },
        {
          "text": "Perfecto, te puedo ayudar con eso",
          "sentAt": "2023-12-24T00:00:00.000Z",
          "role": "agent"
        }
      ],
      "debts": [
        {
          "amount": 1000000,
          "institution": "Banco Estado",
          "dueDate": "2023-12-24T00:00:00.000Z"
        }
      ]
    }
    
    ```
    
- **POST** `/clients/<id>/message`
    
    Crea un nuevo mensaje para un cliente específico.
    
    **Ejemplo de request:**
    
    ```json
    {
        "text": "Hola, quiero comprar un auto",
        "sentAt": "2023-12-24T00:00:00.000Z",
        "role": "client"
    }
    ```
    
- **GET** `/clients-to-do-follow-up`
    
    Obtiene los clientes que tienen el último mensaje hace más de 7 días.
    
- **GET** `/clients/<id>/generateMessage`
    
    Genera un mensaje automático para un cliente usando la API de OpenAI.
    
    **Ejemplo de respuesta:**
    
    ```json
    {
      "text": "Tenemos los siguientes autos: ..."
    }
    ```