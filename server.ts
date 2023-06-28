import {Application,Router} from 'https://deno.land/x/oak/mod.ts';
import {getNotes,createNote,getSingleNote,updateNote,deleteNote} from './routes.ts'

const app = new Application()
app.use(async (ctx, next) => {
    await next();
    console.log(`HTTP ${ctx.request.method} on ${ctx.request.url}, status: ${ctx.response.status}`);
});

const router = new Router();

router
    .get("/",(ctx) => {
        ctx.response.body = 'Welcome';
    })
    .get("/notes/:id",getSingleNote)
    .get("/notes", getNotes)
    .post("/notes", createNote)
    .put('/notes/:id',updateNote)
    .delete('/notes/:id',deleteNote)


app.use(router.routes())
app.use(router.allowedMethods())

app.listen({port:8000})