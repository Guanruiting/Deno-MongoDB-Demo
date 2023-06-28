import { RouterContext } from 'https://deno.land/x/oak/mod.ts'
import db from './mongodb.ts'
import { NoteType } from './type.ts'

const notesCollection = db.collection('notes')

const getNotes = async (ctx: RouterContext) => {
    const notes = await notesCollection.find()
    ctx.response.status = 200
    ctx.response.body = notes
}

const getSingleNote = async (ctx: RouterContext) =>{
    const id = ctx.params.id;
    const note = await notesCollection.findOne({_id: {$oid: id}})
    ctx.response.status = 200
    ctx.response.body = note
}

const createNote = async (ctx: RouterContext) => {
    const res = ctx.request.body();
    if (res.type === "json") {
        const {title,description} = await res.value;
        const note:NoteType = {
            title,
            description,
            date:new Date().getTime()
        }
        const idObj = await notesCollection.insertOne(note)
        const {$oid} = idObj
        note.id =  $oid
        ctx.response.status = 201
        ctx.response.body = note
    } else {
        ctx.response.status = 400
        ctx.response.body = '参数错误'
    }
}

const updateNote = async (ctx: RouterContext) => {
    if(!ctx.request.hasBody){
        ctx.response.status = 400
        ctx.response.body = '参数错误'
    }
    const {title,description} = await ctx.request.body().value
    const id = ctx.params.id;
    // const {title, description} = res.value
    const {modifiedCount} = await notesCollection.updateOne({_id: {$oid: id}},{
        $set:{
            title,
            description
        }
    })
    if(!modifiedCount){
        ctx.response.status = 404;
        ctx.response.body = {message:'Note does exist'}
    }
    ctx.response.body = 'updated'
}

const deleteNote = async (ctx: RouterContext) => {
    const id = ctx.params.id;
    const count = await notesCollection.deleteOne({_id: {$oid: id}})
    if(!count){
        ctx.response.status = 404
        ctx.response.body = {
            message: 'note not exist'
        }
    }else{
        ctx.response.status = 200
        ctx.response.body = 'deleted'
    }
}

export {
    getNotes,
    createNote,
    getSingleNote,
    updateNote,
    deleteNote
}