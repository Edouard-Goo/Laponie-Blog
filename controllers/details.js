import Article from "../models/ArticleModel.js"

export const Details =  async (req, res) => {

try{
    const id = req.params.id
    let oneArticle = await Article.findById(id)

    let HTMLView = "";

    for (const oneComment of oneArticle.comments) {
        HTMLView += `
        <li>
        <h3>${oneComment.pseudo}</h3>
        <p>${oneComment.comment}</p>
        <p class="date-comment">${oneComment.date.toLocaleDateString()}</p>
        </li>
        
        `
    }
    // let oneArticle = await Article.findOne({_id: id})
    
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
     <a class="back" href="/">Retour</a>
    <section class="article-detail">
        <h1>${oneArticle.title}</h1>
        <p>${oneArticle.description}</p>
    </section>
    <section class="comment-article">
        <hr/>
        <ul>
            ${HTMLView}
        </ul>
        <hr/>
    </section>
    <form method="post">
        <label>Pseudo</label>
        <input type="text" name="pseudo">
        <label>commentaire</label>
        <textarea name="content"></textarea>
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
}catch(err){
res.send("Aucun article trouvé avec cet ID")
}
 
}

export const AddComment =  async (req, res) => {
    // Je stocke dans un objet, la valeur de mon formulaire

    try{
        const id = req.params.id
        // const {pseudo, content} = req.body
        let newComment = {
            pseudo: req.body.pseudo,
            comment: req.body.content,
            date: new Date()
        }
    
        await Article.updateOne({_id: id}, {$push: {"comments": newComment}})
    
    
    
            res.redirect(`/details/${id}`);
    }catch(error){
        res.send('Aucun article trouvé avec cet ID')
    }
  

}

