# Nexus Event - Sistema Web de Gestión y Difusión de Eventos

## 📋 Descripción del Proyecto

Nexus Event es una aplicación web desarrollada en JavaScript que permite la publicación y gestión de eventos. El sistema está diseñado para ofrecer una experiencia completa tanto para visitantes como para administradores, facilitando la difusión de eventos y la gestión de suscripciones y contactos.

## 🎯 Objetivos del Sistema

Basado en los requerimientos del cliente, el sistema debe permitir:

- ✅ **Publicación de eventos** con título, descripción, imagen, fecha y estado
- ✅ **Visualización de eventos próximos** con imágenes llamativas
- ✅ **Sistema de suscripciones** para que visitantes reciban correos sobre nuevos eventos
- ✅ **Formulario de contacto** para recibir mensajes de visitantes
- ✅ **Panel administrativo** para gestionar eventos, suscripciones y mensajes

## 🏢 Arquitectura del Proyecto

### Estructura de Directorios

```
nexusEvent/
├── assets/
│   ├── css/
│   │   ├── common.css          # Estilos compartidos
│   │   ├── index.css           # Estilos de la página principal
│   │   ├── login.css           # Estilos del login
│   │   ├── dashboard.css       # Estilos del panel administrativo
│   │   ├── events.css          # Estilos de gestión de eventos
│   │   ├── suscriptions.css    # Estilos de suscripciones
│   │   └── contacts.css        # Estilos de contactos
│   └── db/
│       └── db.json             # Base de datos JSON (JSON Server)
├── pages/
│   ├── login.html              # Página de autenticación
│   ├── dashboard.html          # Panel administrativo principal
│   ├── events.html             # Gestión de eventos
│   ├── suscriptions.html       # Gestión de suscripciones
│   └── contacts.html           # Gestión de mensajes de contacto
├── scripts/
│   └── bulma.js                # Funcionalidades JavaScript (carrusel, etc.)
├── index.html                  # Página principal (landing page)
├── app.js                      # Archivo principal de JavaScript
├── package.json                # Configuración del proyecto
└── README.md                   # Documentación del proyecto
```

## 🚀 Tecnologías Utilizadas

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Framework CSS**: Bulma CSS Framework
- **Base de Datos**: JSON Server (simulación de API REST)
- **Servidor de Desarrollo**: Live Server
- **Gestión de Dependencias**: npm

## 📦 Instalación y Configuración

### Prerrequisitos

- Node.js (versión 14 o superior)
- npm (incluido con Node.js)

### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone <url-del-repositorio>
   cd nexusEvent
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Iniciar el servidor de desarrollo**
   ```bash
   npm run dev
   ```

   Este comando iniciará:
   - JSON Server en el puerto 3000 (API REST)
   - Live Server en el puerto 5500 (Frontend)

4. **Acceder a la aplicación**
   - Frontend: http://localhost:5500
   - API: http://localhost:3000

## 🎮 Scripts Disponibles

```json
{
  "server": "json-server --watch assets/db/db.json",    // Inicia solo el servidor de datos
  "frontend": "live-server --port=5500 --watch=.",      // Inicia solo el servidor frontend
  "dev": "npm run server & npm run frontend",           // Inicia ambos servidores
  "test": "echo \"Error: no test specified\" && exit 1" // Placeholder para tests
}
```

## 📊 Estructura de la Base de Datos

El sistema utiliza JSON Server con la siguiente estructura de datos:

```json
{
  "users": [],        // Usuarios del sistema
  "events": [],       // Eventos publicados
  "suscriptions": [], // Suscripciones de usuarios
  "contacts": []      // Mensajes de contacto
}
```

## 🎨 Características Implementadas

### Página Principal (index.html)
- ✅ **Navegación responsive** con Bulma CSS
- ✅ **Carrusel de eventos destacados** con navegación automática
- ✅ **Sección de evento estrella** con imagen y descripción
- ✅ **Grid de eventos próximos** con tarjetas visuales
- ✅ **Formulario de contacto** integrado
- ✅ **Integración con Google Maps** para ubicación

### Panel Administrativo
- ✅ **Sistema de autenticación** (login.html)
- ✅ **Dashboard principal** con estadísticas
- ✅ **Gestión de eventos** (CRUD completo)
- ✅ **Gestión de suscripciones** de usuarios
- ✅ **Gestión de mensajes de contacto**

### Funcionalidades JavaScript
- ✅ **Carrusel interactivo** con controles manuales y automáticos
- ✅ **Navegación por puntos** en el carrusel
- ✅ **Integración modular** con ES6 modules

## 🎯 Funcionalidades Pendientes

Según los requerimientos del gist, aún faltan implementar:

- [ ] **Sistema de autenticación completo** (backend)
- [ ] **Envío de correos automáticos** para suscripciones
- [ ] **Validación de formularios** en frontend
- [ ] **Persistencia de datos** en base de datos real
- [ ] **Sistema de roles** para administradores
- [ ] **Filtros y búsqueda** de eventos
- [ ] **Sistema de notificaciones** en tiempo real

## 📱 Responsive Design

El proyecto está optimizado para diferentes dispositivos:
- **Desktop**: Layout completo con todas las funcionalidades
- **Tablet**: Adaptación de grids y navegación
- **Mobile**: Navegación colapsable y carrusel táctil

## 👥 Equipo de Desarrollo

Desarrollado como parte del módulo de JavaScript para el sistema de gestión de eventos Nexus Event.

### 🚀 Integrantes del Equipo

| | **Desarrollador** |
|:-:|:-----------------:|
|1| **Daniel Tapias** |
|2| **Emmanuel Perez** |
|3| **Mateo Monsalve** |
|4| **Mariana Restrepo** |
|5| **Juan Carlos Balcero** |