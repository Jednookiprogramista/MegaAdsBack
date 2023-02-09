import {Router} from "express";
import {AdRecord} from "../records/ad.record";


export const adRouter = Router()


    .get('/search/:name?',async (req,res)=>{

        const ads = await AdRecord.findAll(req.params.name ?? '');
        res.json

        res.json(ads);
    })

    .get('/:id',async(req,res)=> {
        const ad = await AdRecord.findAll(req.params.id);
        res.json(ad);


    })
    .post('/',async(req,res)=> {
        const ad = new AdRecord(req.body);
        await ad.insert();
        res.json(ad);
        //add post
    })
