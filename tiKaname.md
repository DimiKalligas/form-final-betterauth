Εχουμε δύο pages login & signup που καλούν αντίστοιχα δύο reusable components login-form & signup-form
# React-Hook-Form
η useForm μας δίνει τις functions
    <register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError, - allows you to manually push an error into the form state, even if the client-side validation already passed.
    getValues,>
και παίρνει για prop: resolver -> `zodResolver(signUpSchema)` για client-side validation
(αυτά τα properties στο shadcn τα κάνουμε spread <Form {...form}>)

## form-withActionSQLLite
για να κάνουμε persist τα email & password σε SQLLite, χρησιμοποιούμε Prisma:
`npm install prisma @prisma/client`
`npx prisma init` - κάνει install τα <schema.prisma> & <prisma.config.ts>
Στο .env DATABASE_URL='file:./dev.db'
οπου username=admin, pwd=admin, database='aviation'
in Schema.Prisma: 
`npx prisma generate` - φτιάχνει το /app/generated folder = o client
`npx prisma db push` - pushes the schema to the database
SQLLite Studio with `npx prisma studio`
look: <https://www.prisma.io/docs/guides/embed-studio-nextjs>

## Prisma & better-auth setup
docs in: https://www.prisma.io/docs/guides/betterauth-nextjs?via=codinginflow

## Better-Auth
better-auth.com/docs/installation
`npm install better-auth` για sqlite: `npm install @prisma/adapter-better-sqlite3 better-sqlite3` & `npm install --save-dev @types/better-sqlite3`
Στο <schema.prisma> προσθέσαμε models: <User> <Session> <Account> & `npx prisma migrate dev` & `npx prisma migrate reset` that deletes existing data.
#server side: create a Better Auth instance for the server: <lib\auth.ts>
#prisma client: πάλι `npx prisma generate` & στο <lib\auth.ts>: `import { PrismaClient } from '@/app/generated/prisma/client';`
API route handler: </app/api/auth/[...all]/route.ts>
#client instance: <lib/auth-client.ts>


# ZOD:
ορίζουμε το schema που είναι object με properties
πως το συνδέουμε με τη φόρμα μας: στη useForm ορίζουμε resolver!

To API μας είναι στο api\signup\route
Αλλά καλύτερα πλέον με Server Action (api\actions.ts)

# TODO
Δεν κάνει login!
Να βάλω session! & to table session τι ρόλο παίζει?
social providers login! OK
How is TLoginSchema different from TFormValues?
set cookie when logged-in, check for cookie when signin-in ->
να δω το session -> https://gemini.google.com/app/6eed26e658c3ec3a τι διαφορές έχει με το landings cookie
Για πιο ωραίο look & to automatically links accessibility attributes (like aria-describedby) between the label, the input, and the error message: αντί για
`{errors.email && <p className="text-red-500">{errors.email.message}</p>}` να χρησιμοποιήσω shadcn:
`<FieldError />`
