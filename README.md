# Fooddy's eCommerce

Fooddy's es una plataforma de comercio electrónico diseñada para personas con poco tiempo que desean mantener una alimentación saludable. La aplicación permite seleccionar comidas del día de manera rápida y efectiva, con entrega a domicilio y empaques diseñados para preservar la frescura de los alimentos.

## 🚀 Características principales

- **Catálogo de productos** con búsqueda y filtrado
- **Carrito de compras** con persistencia en sesión
- **Procesamiento de órdenes** y seguimiento de envíos
- **Gestión de usuarios** con autenticación y roles
- **Panel de administración** con CRUD para usuarios, productos, categorías y órdenes
- **Pasarela de pagos** con Braintree (modo de pruebas)
- **Notificaciones por correo** mediante Gmail
- **Documentación de API** con Swagger

## 🛠 Tecnologías utilizadas

### **Backend** (NestJS)
- NestJS con TypeORM y PostgreSQL
- Autenticación con JWT y Passport
- Envío de correos con `@nestjs-modules/mailer`
- Swagger para documentación de API
- Configuración de variables de entorno con `@nestjs/config`

## 📂 Estructura del Proyecto
```
/backend
 ├── src
 │   ├── auth         # Módulo de autenticación
 │   ├── category     # Gestión de categorías
 │   ├── product      # Módulo de productos
 │   ├── order        # Gestión de órdenes
 │   ├── payment      # Integración con Braintree
 │   ├── mailer       # Servicio de correo
 │   ├── database     # Configuración de base de datos
 │   ├── user         # Gestión de usuarios
 │   ├── main.ts      # Archivo principal
 │   ├── app.module.ts # Módulo principal
```

## 🏗 Configuración y Ejecución

### **1️⃣ Clonar el repositorio**
```bash
git clone https://github.com/Geovanny-Quintero-Velez/ecommerce-backend.git
cd ecommerce-backend/backend
```

### **2️⃣ Configurar variables de entorno**
Crea un archivo `.env` en el directorio `backend/` y agrega:
```env
DATABASE_TYPE=postgres
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=your_postgres_user
DATABASE_PASSWORD=your_postgres_password
DATABASE=fooddys

BRAINTREE_ENVIRONMENT=sandbox
BRAINTREE_MERCHANT_ID=your_merchant_Id
BRAINTREE_PUBLIC_KEY=your_public_key
BRAINTREE_PRIVATE_KEY=your_private_key

EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=465
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_email_app_password
EMAIL_FROM="Fooddys <your_gmail@gmail.com>"
```

(El proyecto fue construido con el gestor postgresql en local para la etapa de desarrollo)

### **3️⃣ Instalar dependencias**
```bash
npm install
```

### **4️⃣ Ejecutar seed.ts**
```bash
npx ts-node src/database/seed.ts
```

### **5️⃣ Ejecutar el backend**
```bash
npm run start
```
La API estará disponible en `http://localhost:8000/api/v1`

### **7️6️⃣ Acceder a Swagger (Documentación API)**
```bash
http://localhost:8000/docs
```

## 📧 Configuración de Email
Para usar Gmail como servidor SMTP:
1. Usa una contraseña de aplicación.
2. Configura las variables en `.env`.

## 💳 Pruebas con Braintree (Modo Sandbox)
1. Regístrate en Braintree Sandbox.
2. Obtén las claves API y agrégalas al archivo `.env`.
3. Usa la tarjeta de prueba:
   ```
   Número: 4111 1111 1111 1111
   Expiración: 12/24
   CVV: 123
   ```

## 🎨 Diseño y Documentación
Para conocer el diseño visual del proyecto, puedes acceder al siguiente enlace de **Figma**:
🔗 [Diseño en Figma](https://www.figma.com/design/iU8ZgBSa4q6IBjwrmbCkWm/Mockups?node-id=0-1&t=W1zDtGOyCXyNKyqB-1)

Además, puedes revisar la documentación detallada del proyecto y sus artefactos en el siguiente documento:
🔗 [Informe del Proyecto](https://docs.google.com/document/d/19vmyPiER2yokJlXZWlHlCjqEgYh51uStDw3VmPUoHIY/edit?usp=sharing)

## 🔥 Contribuciones
Si quieres contribuir al proyecto, abre un issue o haz un pull request.

---
📌 **Autor:** Geovanny Quintero Velez, Juan David Garzon Diaz, Gabriel Restrepo, Juan Camilo Gonzales.
📌 **Repositorio:** [GitHub](https://github.com/Geovanny-Quintero-Velez/ecommerce-backend.git)

