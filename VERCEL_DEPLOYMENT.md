# Guía de Despliegue en Vercel

## Problema: SQLite en Vercel

Vercel es un entorno serverless que no permite escribir a disco de forma persistente. SQLite local no funciona en Vercel. 

## Solución: Usar PostgreSQL

La forma más fácil es usar **Supabase** (PostgreSQL gratuito).

### Pasos:

1. **Crea una cuenta en Supabase**:
   - Ve a https://supabase.com
   - Registrate o inicia sesión
   - Crea un nuevo project

2. **Obtén tus credenciales**:
   - Ve a Project Settings → Database
   - Copia la URL de conexión: `postgresql://user:password@host:port/database`

3. **En Vercel**:
   - Ve a tu proyecto en https://vercel.com
   - Settings → Environment Variables
   - Añade: `DATABASE_URL` con tu URL de Supabase

4. **Actualiza el código**:
   - En tu próxima actualización, ejecuta las migraciones necesarias
   - La app trabajará con PostgreSQL en lugar de SQLite

## Alternativa rápida (sin cambiar BD):

Si prefieres mantener SQLite localmente mientras despliegas, puedes usar **Vercel KV** (Redis):
- Es más complejo pero funciona sin cambiar tu base de datos local

## Recomendación:

**Usa Supabase PostgreSQL** - Es:
- ✅ Gratuito (hasta cierto límite)
- ✅ Fácil de configurar
- ✅ Funciona perfectamente en Vercel
- ✅ Más escalable que SQLite

## Próximos pasos:

1. Configura Supabase
2. Añade DATABASE_URL en Vercel
3. Haz commit de los cambios
4. Vercel desplegará automáticamente
