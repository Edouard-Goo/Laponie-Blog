import Article from "../models/ArticleModel.js"

export const Admin = async (req, res) => {

    const articles = await Article.find({}).sort({ date: -1 }).limit(30)
    let HTMLView = ""

    for (const oneArticle of articles) {
        HTMLView += `
        <tr>
        <td><img class="admin-img" src="${oneArticle.images[0].src}" alt="${oneArticle.images[0].alt}" /></td>
        <td>
            <a class="back" href="/details/${oneArticle._id}">${oneArticle.title}</a>
        </td>
        <td>${oneArticle.description.substring(0, 30)}...</td>
        
        <td>${oneArticle.category}</td>
        <td>
            <a class="edit" href="/edit/${oneArticle._id}"><i class="fa fa-pencil"></i></a>
            <a class="remove" href="/delete/${oneArticle._id}"><i class="fa fa-remove"></i></a>
        </td>
    </tr>
        
        `
    }

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
<h1>Admin</h1>

<a class="back" href="/admin/add">Ajouter un article</a>

<table>
	<thead>
            <th>Image </th>
			<th>Titre</th>
            <th>Article</th>
            <th>Catégorie</th>
            <th>Action</th>
	</thead>
	<tbody>
	${HTMLView}
	</tbody>
</table>
</main>

<!-- Pied de page commun de l'application -->
<footer class="blog-footer">
	<small>Le blog qui donne envie de voyager</small>
</footer>
</body>
</html>
`)
}

export const AddPost = async (req, res) => {
    try {
        let category = await Article.distinct("category")
        console.log(category)
        let HTMLView = "";

        for (const oneCategory of category) {
            HTMLView += `
            <option value="${oneCategory}">${oneCategory}</option>
            `
        }
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
        <h1>Ajoutez un article</h1>
       
       <form  method="post" enctype="multipart/form-data">
           <label>Titre de l'article</label>
           <input type="text" name="title">
           <label>Image</label>
           <input type="file" name="image">
           <label>Contenu de l'article</label>
           <textarea name="content"></textarea>
           
           <select name="category">
                   ${HTMLView}
           </select>
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
        res.send("Aucune catégorie trouvée")
    }

}


export const AddPostSubmit = async (req, res) => {

    try {

        let newArticle;

        if(req.file){
            newArticle = new Article({
                title: req.body.title,
                description: req.body.content,
                category: req.body.category,
                date: new Date(),
                images: {
                    src: req.file.filename,
                    alt: req.file.originalname
                }
    
    
            })
        }else {
            newArticle = new Article({
                title: req.body.title,
                description: req.body.content,
                category: req.body.category,
                date: new Date(),
                images: {
                    src: "",
                    alt: ""
                }
    
    
            })
        }


        await newArticle.save()

        res.redirect("/admin")

    } catch (err) {
        res.send("Ajout impossible")
    }


}


export const DeletePost = async (req, res) => {

    try {
        const id = req.params.id

        let deleteArticle = await Article.deleteOne({_id: id})

        // Gestion des erreurs
        if(!deleteArticle){
            return res.send("Article introuvable")
        }
   
        res.redirect("/admin")

    } catch (err) {
        res.send("Suppression impossible avec cet ID!")
    }

}

export const EditPost = async (req, res) => {

    try {
        const id = req.params.id
        const oneArticle = await Article.findOne({ _id: id })
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
       <h1>Editez un article</h1>
    
       <form  method="post" enctype="multipart/form-data">
           <label>Titre de l'article</label>
           <input type="text" name="title" value="${oneArticle.title}">
           <label>Image de l'article</label>
           <input type="file" name="image">
           <label>contenu de l'article</label>
           <textarea name="content">${oneArticle.description}</textarea>
           
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
        res.send("Aucun article trouvé avec cet ID")
    }

}

export const EditPostSubmit = async (req, res) => {

    try {
        const id = req.params.id

        let editArticle; 

        // Si l'utilisateur ne modifie pas l'image
        if(req.file){

            editArticle = {
               title: req.body.title,
               description: req.body.content, 
               images: {
                   src: req.file.filename,
                   alt: req.file.originalfilename
               }
             }
        }   else {
            editArticle = {
                title: req.body.title,
                description: req.body.content,
                images: {
                    src: "",
                    alt: ""
                }
        }
        }

        await Article.updateOne({ _id: id }, editArticle)

        res.redirect("/admin")

    } catch (err) {
        res.send("Erreur, aucun article trouvé avec cet ID pour l'édition")
    }


}
