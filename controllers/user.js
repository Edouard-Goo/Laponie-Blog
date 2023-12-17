import User from "../models/UserModel.js"
import bcrypt from "bcrypt";
export const LoginPage = (req, res) => {
    try {
       
        res.send(`
        <!DOCTYPE html>
       <html lang="fr">
       <head>
           <meta charset="utf-8">
           <title>Blog</title>
       
           <!-- Feuilles de style externes -->
           <link rel="stylesheet" href="/css/normalize.css">
           <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
           <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet">
           <link rel="stylesheet" href="/css/style.css">
       </head>
       <body>
           <!-- En-tête commune de l'application -->
           <header class="blog-header">
               <div>
                   <h1><a href="/"><i class="fa fa-microphone"></i> La Laponie</a></h1>
                   <nav>
                       <a href="/"><i class="fa fa-home"></i>Home</a>
                       <a href="/admin"><i class="fa fa-cogs"></i> Administration</a>
                   </nav>
               </div>
           </header>
       
           <main>
        <h1>Se connecter</h1>
       
       <form method="post">
           <label>Email</label>
           <input type="email" name="email">
           <label>Mot de passe</label>
           <input type="text" name="password">
           
        
           <input type="submit" name="Enregistrer">
       </form>
       </main>
       
       <!-- Pied de page commun de l'application -->
       <footer class="blog-footer">
           <small>Le blog qui donne envie de voyager</small>
       </footer>
       </body>
       </html>
        `)
    } catch (err) {
        res.send("Erreur page inexistante")
    }
}

export const LoginSubmit = async (req, res) => {

    let user = await User.findOne({email: req.body.email})

    // MEILLEURE VERSION A UTILISER -- GUARD CLAUSE 
    if(!user){
       return res.send("Email introuvable")
    }


    let checkPassword = bcrypt.compareSync(req.body.password, user.password )
    if(!checkPassword){
       return  res.send("Mot de passe incorrecte, veuillez revoir votre saisie")
    }

    if(user.role === "Admin"){
        req.session.isAdmin = user._id
    }
    else{

        req.session.isLogged = user._id 
    }
    res.redirect("/")


}

// -----------------------------------------------------
// REGISTER
// -----------------------------------------------------

export const RegisterPage = (req, res) => {
    try {
       
        res.send(`
        <!DOCTYPE html>
       <html lang="fr">
       <head>
           <meta charset="utf-8">
           <title>Blog</title>
       
           <!-- Feuilles de style externes -->
           <link rel="stylesheet" href="/css/normalize.css">
           <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
           <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet">
           <link rel="stylesheet" href="/css/style.css">
       </head>
       <body>
           <!-- En-tête commune de l'application -->
           <header class="blog-header">
               <div>
                   <h1><a href="/"><i class="fa fa-microphone"></i> La Laponie</a></h1>
                   <nav>
                       <a href="/"><i class="fa fa-home"></i>Home</a>
                       <a href="/admin"><i class="fa fa-cogs"></i> Administration</a>
                   </nav>
               </div>
           </header>
       
           <main>
        <h1>S'enregistrer</h1>
       
       <form method="post">
            <label>Login</label>
           <input type="text" name="login">
           <label>Email</label>
           <input type="email" name="email">
           <label>Mot de passe</label>
           <input type="text" name="password">
           
        
           <input type="submit" name="Enregistrer">
       </form>
       </main>
       
       <!-- Pied de page commun de l'application -->
       <footer class="blog-footer">
           <small>Le blog qui donne envie de voyager</small>
       </footer>
       </body>
       </html>
        `)
    } catch (err) {
        res.send("Erreur page inexistante")
    }
}

export const RegisterSubmit = async (req, res) => {

// let newUser = {
//     login: req.body.login,
//     email: req.body.email,
//     password: req.body.password
// }

// await User.save(newUser)

// ----------------- 

try{
    // Je vérifie que l'email n'existe pas 
    let checkMailExist = await User.findOne({email: req.body.email})

    if(checkMailExist){
        return res.send("Cet email est déjà enregistré")
    }

    let newUser = new User({
        login: req.body.login,
        email: req.body.email,
        password: req.body.password
    })
   

    // Mon hook pre va s'excuter avant de sauvegarder dans la base de données
    await newUser.save()

    res.redirect("/login")
}catch(err){

    res.send("Impossible de créer un compte")
}


}

// -----------------------------------------------------
// LOGOUT
// -----------------------------------------------------

export const Logout = (req, res) => {

    req.session.destroy((err)=>{
        res.redirect("/login")
    })

}