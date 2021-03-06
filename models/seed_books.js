const seedBooks = [
  {
    title: "Project Hail Mary",
    qty: 1,
    genre: "Science Fiction",
    author: "Andy Weir",
    bookImg: "https://images2.penguinrandomhouse.com/cover/9780593135204",
    description:
      "A lone astronaut must save the earth from disaster in this irresistible interstellar adventure as only Andy Weir could deliver. Project Hail Mary is a tale of discovery, speculation, and survival that takes us to places we’ve never dreamed of going.",
  },
  {
    title: "Klara and the Sun",
    qty: 1,
    genre: "Science Fiction",
    author: "Kazuo Ishiguro",
    bookImg: "https://images1.penguinrandomhouse.com/cover/9780593318171",
    description:
      "A magnificent new novel from Nobel laureate Kazuo Ishiguro. Klara and the Sun is a thrilling book that offers a look at our changing world through the eyes of Klara—an Artificial Friend with outstanding observational qualities—and one that explores the fundamental question: what does it mean to love?",
  },
  {
    title: "Effortless",
    qty: 1,
    genre: "Business",
    author: "Greg McKeown",
    bookImg: "https://images1.penguinrandomhouse.com/cover/9780593135648",
    description:
      "We’ve been conditioned to believe that the path to success is paved with relentless work. But getting ahead doesn’t have to be as hard as we make it. We can find an easier path. Effortless offers actionable advice for making the most essential activities the easiest ones, so you can achieve the results you want, without burning out.",
  },
  {
    title: "Gold Diggers",
    qty: 1,
    genre: "Science Fiction",
    author: "Sanjena Sathian",
    bookImg: "https://images4.penguinrandomhouse.com/cover/9780593318171",
    description:
      "A magical realism coming-of-age story, Gold Diggers skewers the model minority myth to tell a hilarious and moving story about immigrant identity, community, and the underside of ambition.",
  },
  {
    title: "Luck of Titanic",
    qty: 1,
    genre: "Science Fiction",
    author: "Stacey Lee",
    bookImg: "https://images4.penguinrandomhouse.com/cover/9781524740986",
    description:
      "The richly imagined story of Valora and Jamie Luck, twin British-Chinese acrobats traveling aboard the Titanic on its ill-fated maiden voyage.",
  },
  {
    title: "Before She Disappeared",
    qty: 1,
    genre: "Thriller",
    author: "Lisa Gardner",
    bookImg: "https://images1.penguinrandomhouse.com/cover/9781524745073",
    description:
      "Pick up a propulsive thriller featuring an ordinary woman who will stop at nothing to find the missing people that the rest of the world has forgotten.",
  },
  {
    title: "Four Hundred Souls",
    qty: 1,
    genre: "History",
    author: "Ibram X. Kendi and Keisha N. Blain",
    bookImg: "https://images1.penguinrandomhouse.com/cover/9780593134047",
    description:
      "A chorus of extraordinary voices tells the epic story of the four-hundred-year journey of African Americans from 1619 to the present. This collection of diverse pieces from ninety different minds, reflecting ninety different perspectives unlocks the startling range of experiences and ideas that have always existed within the community of Blackness.",
  },
  {
    title: "People We Meet on Vacation",
    qty: 1,
    genre: "Literary Fiction",
    author: "Emily Henry",
    bookImg: "https://images3.penguinrandomhouse.com/cover/9781984806758",
    description:
      "From the bestselling author of Beach Read comes a sparkling new novel that will leave you with the warm, hazy afterglow usually reserved for the best vacations. Two best friends. Ten summer trips. One last chance to fall in love.",
  },
  {
    title: "Crying in H Mart",
    qty: 1,
    genre: "Biography",
    author: "Michelle Zauner",
    bookImg: "https://images1.penguinrandomhouse.com/cover/9780525657743",
    description:
      "From the indie rockstar of Japanese Breakfast fame comes an unflinching, powerful memoir about growing up Korean American, losing her mother, and forging her own identity. Vivacious and plainspoken, lyrical and honest, Zauner’s voice is as radiantly alive on the page as it is onstage.",
  },
  {
    title: "Malibu Rising",
    qty: 1,
    genre: "Literary Fiction",
    author: "Taylor Jenkins Reid",
    bookImg: "https://images1.penguinrandomhouse.com/cover/9781524798659",
    description:
      "Four famous siblings throw an epic party to celebrate the end of the summer. But over the course of twenty-four hours, their lives will change forever and secrets that shaped this family’s generations will all come rising to the surface.",
  },
  {
    title: "Set Boundaries, Find Peace",
    qty: 1,
    genre: "Self-Help",
    author: "Nedra Glover Tawwab",
    bookImg: "https://images2.penguinrandomhouse.com/cover/9780593192092",
    description:
      "In a relatable and inclusive tone, Set Boundaries, Find Peace presents simple-yet-powerful ways to establish healthy boundaries in all aspects of life. These techniques will help you end the struggle, speak up for what you need, and experience the freedom of being truly yourself.",
  },
  {
    title: "A Swim in a Pond in the Rain",
    qty: 1,
    genre: "Literary Fiction",
    author: "George Saunders",
    bookImg: "https://images4.penguinrandomhouse.com/cover/9780593318171",
    description:
      "George Saunders offers a literary masterclass on what makes great stories work and what they can tell us about ourselves—and our world today.",
  },
  {
    title: "The Sum of Us",
    qty: 1,
    genre: "Literary Fiction",
    author: "Heather Mcghee",
    bookImg: "https://images1.penguinrandomhouse.com/cover/9780525509561",
    description:
      "The Sum of Us is a brilliant analysis of how we became divided and self-destructing, materially rich but spiritually starved and vastly unequal. It offers a powerful exploration of inequality and the lesson that generations of Americans have failed to learn: Racism has a cost for everyone—not just for people of color.",
  },
  {
    title: "While Justice Sleeps",
    qty: 1,
    genre: "Science Fiction",
    author: "Stacey Abrams",
    bookImg: "https://images2.penguinrandomhouse.com/cover/9780385546577",
    description:
      "From celebrated national leader and bestselling author Stacey Abrams, a gripping thriller set within the halls of the U.S. Supreme Court—where a young law clerk finds herself embroiled in a shocking mystery plotted by one of the most preeminent judges in America.",
  },
  {
    title: "Dial A for Aunties",
    qty: 1,
    genre: "Literary Fiction",
    author: "Jesse Q Sutanto",
    bookImg: "https://images2.penguinrandomhouse.com/cover/9780593336731",
    description:
      "What happens when you mix 1 (accidental) murder with 2 thousand wedding guests, and then toss in a possible curse on 3 generations of an immigrant Chinese-Indonesian family? You get 4 meddling Asian aunties coming to the rescue!",
  },
  {
    title: "Last Night at the Telegraph Club",
    qty: 1,
    genre: "Science Fiction",
    author: "Malinda Lo",
    bookImg: "https://images1.penguinrandomhouse.com/cover/9780525555254",
    description:
      "Seventeen-year-olds Lily Hu and Kathleen Miller find love and community in the lesbian bar called the Telegraph Club. But America in 1954 is not a safe place for two girls to fall in love. Lily and Kath will risk everything to let their love see the light of day.",
  },
  {
    title: "The Son of Mr. Suleman",
    qty: 1,
    genre: "History",
    author: "Eric Jerome Dickey",
    bookImg: "https://images1.penguinrandomhouse.com/cover/9781524745233",
    description:
      "In The Son of Mr. Suleman, Eric Jerome Dickey takes readers on a powerful journey exploring racism, colorism, truth and lies, family legacies, the power of death, and the weight of love. It is an extraordinary story, page-turning and intense, and a book only Dickey could write.",
  },
  {
    title: "Eternal",
    qty: 1,
    genre: "Science Fiction",
    author: "Lisa Scottoline",
    bookImg: "https://images1.penguinrandomhouse.com/cover/9780525539766",
    description:
      "Unfolding over decades, Eternal is a sweeping epic of historical fiction. It tells the tale of a love triangle that unfolds in the heart of Rome…in the creeping shadow of fascism. Against this backdrop is a heartbreaking story of both the best and the worst that the world has to offer.",
  },
  {
    title: "Empire of Pain",
    qty: 1,
    genre: "Science Fiction",
    author: "Patrick Radden Keefe",
    bookImg: "https://images4.penguinrandomhouse.com/cover/9780385545686",
    description:
      "A grand, devastating portrait of three generations of the Sackler family, whose fortune was built by Valium and whose reputation was destroyed by OxyContin. Empire of Pain is a masterpiece of narrative reporting and writing, exhaustively documented, and ferociously compelling.",
  },
  {
    title: "Beautiful Country",
    qty: 1,
    genre: "Science Fiction",
    author: "Qian Julie Wang",
    bookImg: "https://images4.penguinrandomhouse.com/cover/9780385547215",
    description:
      "Discover the moving story of an undocumented child living in poverty in the richest country in the world—an incandescent debut from an astonishing new talent.",
  },
  {
    title: "Let Me Tell You What I Mean",
    qty: 1,
    genre: "Self-Help",
    author: "Joan Didion",
    bookImg: "https://images2.penguinrandomhouse.com/cover/9780593318485",
    description:
      "From one of the most iconic and influential writers: a timeless collection of mostly early pieces that reveal what would become Joan Didion’s subjects, including the press, politics, California robber barons, women, and her own self-doubt. Each piece is classic Didion: incisive, bemused, and stunningly prescient.",
  },
];

module.exports = seedBooks;
