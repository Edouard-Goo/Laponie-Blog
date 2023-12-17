import Article from "../models/ArticleModel.js"

export const GetHome =  async (req, res) => {

    const articles = await Article.find({}).limit(30).sort({date: -1}) // ça me renvoie un tableau

    let HTMLView = "";

    for (const oneArticle of articles) {
        HTMLView += `
        <li>
        <img class="home-img" src="${oneArticle.images[0].src}" alt="${oneArticle.images[0].alt}" />
        <a href="/details/${oneArticle._id}">${oneArticle.title.toUpperCase()}</a>
        <p>${oneArticle.description.substring(0, 100)}...</p>
        <p>${oneArticle.date.toLocaleDateString("fr-FR")}</p>
        </li>
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
                <a href="/login">Log-In</a>
                <a href="/register">Sign-up</a>
            </nav>
        </div>
    </header>

    <main>
<h1>Home</h1>
<p>Bienvenu sur mon blog, vous trouverez ici tous mes articles sur la Laponie !!!!</p>
<ul class="home-list">
${HTMLView}
</ul>
</main>

<!-- Pied de page commun de l'application -->
<footer class="blog-footer">
    <small>Le blog qui donne envie de voyager</small>
</footer>
</body>
</html>
`)
}

