import { API_KEY } from "./env.js";

const review = [
    {
        "author_name": "Maria de Lourdes Gonçalves",
        "author_url": "https://www.google.com/maps/contrib/100350890291034203559/reviews",
        "language": "pt",
        "original_language": "pt",
        "profile_photo_url": "https://lh3.googleusercontent.com/a/ACg8ocLyKLIskHL9-XSetbDeNfXQYtAatzU1vMkxAqJM0uw=s128-c0x00000000-cc-rp-mo",
        "rating": 5,
        "relative_time_description": "uma semana atrás",
        "text": "Minha experiência foi maravilhosa!.super recomendo, na especial encontrarmos, excelentes profissionais comprometidos com a nossa saúde bucal. Lá tive minha Auta estima devolvida . Estou muito FELIZ! Parabéns 💐💐 a toda equipe que faz  parte da Clínica Especiale.",
        "time": 1701880730,
        "translated": false
    },
    {
        "author_name": "Valdiaer Lima Silva Junior",
        "author_url": "https://www.google.com/maps/contrib/107070486856735919977/reviews",
        "language": "pt",
        "original_language": "pt",
        "profile_photo_url": "https://lh3.googleusercontent.com/a/ACg8ocJixqEBtTHleaHr8YQiz-VSYLhQ7TAQCk0MlLu9kj_C=s128-c0x00000000-cc-rp-mo",
        "rating": 5,
        "relative_time_description": "uma semana atrás",
        "text": "A melhor clínica odontológica em quê fui atendido, nem longe vi algo tão profissional e com tanta qualidade , desde do atendimento até o procedimentos.\nEu recomendo muito!!!",
        "time": 1701880040,
        "translated": false
    },
    {
        "author_name": "Sheila Raposo",
        "author_url": "https://www.google.com/maps/contrib/107857481839807364343/reviews",
        "language": "pt",
        "original_language": "pt",
        "profile_photo_url": "https://lh3.googleusercontent.com/a-/ALV-UjWPtLIOFjuBjGh2GD4NXGlpGlcHOmI43sloSfLNVO9LHME=s128-c0x00000000-cc-rp-mo",
        "rating": 5,
        "relative_time_description": "uma semana atrás",
        "text": "Foi muito sofrido pois tinha que fazer um enxêrto e precisei esperar uns seis meses para poder fazer o implante mas no final deu tudo certo e ficou perfeito!",
        "time": 1701880298,
        "translated": false
    },
    {
        "author_name": "WAL SALES",
        "author_url": "https://www.google.com/maps/contrib/117511024840390177844/reviews",
        "language": "pt",
        "original_language": "pt",
        "profile_photo_url": "https://lh3.googleusercontent.com/a-/ALV-UjXF4pATk9_2zXaNiSnaLaMwZnLQsSIt1EoQkTklLj2xngg=s128-c0x00000000-cc-rp-mo",
        "rating": 5,
        "relative_time_description": "uma semana atrás",
        "text": "A equipe é excelente!! E fiquei mto feliz com meu tratamento dentário.... voltarei sempre!",
        "time": 1701883749,
        "translated": false
    },
    {
        "author_name": "Leandra Santos",
        "author_url": "https://www.google.com/maps/contrib/111620392582512115556/reviews",
        "language": "pt",
        "original_language": "pt",
        "profile_photo_url": "https://lh3.googleusercontent.com/a-/ALV-UjXMA5uhQeqx9f1DeqLD14kRpBfksv-ITy0xG1XEWp-JPdA=s128-c0x00000000-cc-rp-mo",
        "rating": 5,
        "relative_time_description": "uma semana atrás",
        "text": "Um ambiente muito agradável! Profissionais super responsáveis e atenciosos, atendimento acolhedor. Fiquei muito satisfeita e recomendo demais.",
        "time": 1701452402,
        "translated": false
    }
]

const createCard = (review) => {
    const card = document.createElement("li");
    const header = document.createElement("div");
    const avatar = document.createElement("img");
    const userInfo = document.createElement("span");
    const author = document.createElement("p");
    const date = document.createElement("p");
    const note = document.createElement("p");
    const paragraph = document.createElement("p");

    card.classList.add("main__avaliation");
    header.classList.add("main__postHeader");
    avatar.classList.add("main__userAvatar");
    userInfo.classList.add("main__userInfo");
    author.classList.add("main__avaliation--author");
    date.classList.add("main__avaliation--date");
    note.classList.add("main__avaliation--note");
    paragraph.classList.add("main__avaliation--paragraph");

    avatar.src = review.profile_photo_url;
    author.innerText = review.author_name;
    date.innerText = review.relative_time_description;
    note.innerText = `${review.rating.toFixed(1)} ⭐️`
    paragraph.innerText = review.text

    userInfo.append(author, date)
    header.append(avatar, userInfo);
    card.append(header, note, paragraph);

    return card
}

const renderCards = (reviews) => {
    const cardList = document.querySelector(".main__thirdSection--list");

    cardList.innerHTML = ""

    reviews.forEach((review) => {
        const card = createCard(review)

        cardList.appendChild(card)
    })
}

renderCards(review)

const getInstaFeed = async () => {
    const fields = "media_url, media_type, permalink, timestamp"
    const token = API_KEY

    const insta = await fetch(`https://graph.instagram.com/me/media?access_token=${token}&fields=${fields}`, {
        method: 'GET',
    })
        .then(async (res) => {
            const resConvert = await res.json()

            const lastPosts = resConvert.data.slice(resConvert.data.length - 4, 3);

            if (res.ok) {
                renderPost(lastPosts)
            } else {
                console.log("Erro")
            }
        })

    return insta
}

getInstaFeed()

const createPost = (post) => {
    const card = document.createElement("li");
    const link = document.createElement("a");
    const image = document.createElement("img");
    const date = document.createElement("span");
    const icon = document.createElement("img");
    const paragraph = document.createElement("p");

    card.classList.add("main__instaPost");
    link.classList.add("main__instaPost--post");
    image.classList.add("main__instaPost--image");
    date.classList.add("main__instaPost--date");
    icon.classList.add("main__instaPost--icon");

    const objectDate = new Date(post.timestamp);
    const day = objectDate.getDate();
    const month = objectDate.getMonth();
    const year = objectDate.getFullYear();
    const monthNames = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

    link.href = post.permalink;
    link.target= "_blank"
    image.src = post.media_url;
    icon.src = "./src/assets/instagram.svg"
    paragraph.innerText = `${day} de ${monthNames[month]} de ${year}`;

    date.append(icon, paragraph);
    link.append(image, date);
    card.append(link);

    return card
}

const renderPost = (photoPost) => {
    const cardList = document.querySelector(".main__firstSection--list");

    cardList.innerHTML = ""

    photoPost.forEach((post) => {
        const card = createPost(post)

        cardList.appendChild(card)
    })
}