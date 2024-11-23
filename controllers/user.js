const user = require('../models/user')
const bcrypt = require('bcrypt')

async function handleget(req,res){
    try{
        const result = await user.find()
        return res.status(200).json(result)
    }catch(err){
        return res.status(500).json({error:"server is not working properly",err})

    }
}

async function handlesingleuser(req,res){
    const id = req.params.id;
    if(!id){
        return res.status(400).json({error:"id is required"})
    }
    try{
        const result = await user.findById(id)
        if(!result){
            return res.status(404).json({error:"user not found"})
        }
        return res.json(result)
        
    }catch(err){
        return res.status(500).json({error:"server is not working properly",err})

    }
}

async function handledelete(req,res){
    const id = req.params.id;
    if(!id){
        return res.status(400).json({error:"id is required"})
    }
    try{
        const userfind = await user.findByIdAndDelete(id)
        return res.status(200).json(userfind)

    }catch(err){
        return res.status(500).json({error:"server is not working",err})

    }
}

async function handlepost(req,res){
    const {name,password,email,phone} = req.body;
    if(!name || !email || !password || !phone){
        return res.status(400).json({error:"all fields are required"})
    }
    const useremail = await user.findOne({email})
    const userphone = await user.findOne({phone})
    if(useremail || userphone){
        return res.status(400).json({error:"email or phone is already in use"})
    }

    try{
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password,salt)
        const result = user.create({
            name:name,
            email:email,
            password:hash,
            phone:phone
        })
        return res.status(200).json({message:"user is created"})
    }catch(err){
        return res.status(500).json({error:"server is not responding",err})

    }
}

async function handleput(req,res){
    const id = req.params.id;
    if(!id){
        return res.status(400).json({error:"id is required"})
    }

    const {name,email,password,phone} = req.body;

    try{
        const updatedata = {}
        if(name) updatedata.name = name;
        if(password){
            const salt = bcrypt.genSaltSync(10)
            updatedata.password = bcrypt.hashSync(password,salt)
        }
        if(email){
            const olduser = await user.findOne({email});
            if(olduser && olduser._id.toString() !==id){
                return res.status(400).json({error:"this email is in use"})
            }
            updatedata.email = email;
        }
        if(phone){
            const olduser = await user.findOne({phone});
            if(olduser && olduser._id.toString() !==id){
                return res.status(400).json({error:"this phone is in use"})
            }
            updatedata.phone = phone;
        }

        const result = await user.findByIdAndUpdate(id,updatedata)
        return res.status(200).json({message:"user data is updated"})
    }catch(err){
        return res.status(500).json({error:"server is not working",err})
    }
    
}

module.exports = {
    handledelete,
    handleget,
    handlepost,
    handleput,
    handlesingleuser
}