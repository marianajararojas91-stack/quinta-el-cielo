# Guía de Deployment para Producción con Turso

## ✅ Configuración Completada

Todas las rutas de API están configuradas correctamente para usar Turso en producción:

### Rutas de API Configuradas:
- ✅ `/api/auth/login` - Autenticación de usuarios
- ✅ `/api/auth/register` - Registro de nuevos usuarios
- ✅ `/api/auth/logout` - Cerrar sesión
- ✅ `/api/auth/session` - Obtener sesión actual
- ✅ `/api/bookings/available` - Consultar fechas disponibles
- ✅ `/api/bookings/create` - Crear nueva reserva

### Tablas de Base de Datos:
- ✅ `Users` - Usuarios registrados
- ✅ `Sessions` - Sesiones activas
- ✅ `Bookings` - Reservas
- ✅ `Reviews` - Valoraciones
- ✅ `BlockedDates` - Fechas bloqueadas

## 🚀 Pasos para Deployment en Vercel

### 1. Configurar Turso

Si aún no tienes una base de datos Turso, créala:

```bash
# Instalar Turso CLI (si no lo tienes)
npm install -g @turso/cli

# Autenticarte en Turso
turso auth signup
# o si ya tienes cuenta:
turso auth login

# Crear base de datos
turso db create quinta-el-cielo

# Obtener URL de la base de datos
turso db show quinta-el-cielo --url

# Crear token de autenticación
turso db tokens create quinta-el-cielo
```

### 2. Configurar Variables de Entorno en Vercel

Ve a tu proyecto en Vercel → Settings → Environment Variables y agrega:

**ASTRO_DATABASE_FILE**
```
libsql://[TU-DB-NAME].turso.io?authToken=[TU-TOKEN]
```

**JWT_SECRET**
```
[Genera uno con: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"]
```

**SITE_URL**
```
https://tu-dominio.vercel.app
```

### 3. Push del Schema a Turso

Una vez configurada la variable `ASTRO_DATABASE_FILE`, sincroniza el schema:

```bash
npx astro db push --remote
```

Este comando creará todas las tablas definidas en `db/config.ts` en tu base de datos Turso.

### 4. (Opcional) Seed Inicial

Si necesitas datos iniciales, puedes ejecutar:

```bash
npx astro db execute db/seed.ts --remote
```

### 5. Deploy

```bash
# Commit y push a tu repositorio
git add .
git commit -m "Configure production database"
git push

# O deploy manual con Vercel CLI
vercel --prod
```

## 🔍 Verificación

Después del deployment, verifica que:

1. ✅ Las rutas de autenticación funcionen (`/login`, `/register`)
2. ✅ Se puedan consultar fechas disponibles
3. ✅ Se puedan crear reservas
4. ✅ Los datos persistan entre deployments

## 📝 Notas Importantes

- **Desarrollo Local**: Astro DB usa SQLite automáticamente cuando `ASTRO_DATABASE_FILE` no está configurado
- **Producción**: Astro DB se conecta a Turso cuando la variable está configurada
- **Migraciones**: Cada vez que cambies el schema en `db/config.ts`, ejecuta `npx astro db push --remote`
- **Backups**: Turso hace backups automáticos, pero puedes crear backups manuales con `turso db backup`

## 🛠️ Comandos Útiles

```bash
# Ver estado de la base de datos
turso db show quinta-el-cielo

# Ejecutar SQL directo
npx astro db shell --query "SELECT * FROM Users" --remote

# Ver logs de Turso
turso db inspect quinta-el-cielo

# Crear backup manual
turso db backup quinta-el-cielo
```

## 🐛 Troubleshooting

### Error: "Invalid URL"
- Verifica que `ASTRO_DATABASE_FILE` esté configurada correctamente en Vercel
- El formato debe ser: `libsql://nombre.turso.io?authToken=token`

### Error: "Table does not exist"
- Ejecuta `npx astro db push --remote` para sincronizar el schema

### Error de conexión en producción
- Verifica que el token de Turso sea válido
- Crea un nuevo token con `turso db tokens create quinta-el-cielo`
