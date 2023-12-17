export const isLogged = (req, res, next) => {

    if(!req.session.isLogged && !req.session.isAdmin){
        res.send("Vous n'êtes pas connecté pour accéder à cette page.")
    }else{
        
        next();
    }


}

export const isAdmin = (req, res, next) => {

    if(!req.session.isAdmin){
        res.send("Vous devez être administrateur pour accéder à cette page.")
    }else{
        
        next();
    }


}