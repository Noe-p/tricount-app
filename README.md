# tricount-app

J'ai choisis d'utiliser le framework **Next.js** pour ce projet. En effet ce framework est très pratique pour faire du SSR (Server Side Rendering) et du SSG (Static Site Generation). De plus, j'utilise cet outil dans mon alternance. 

Pour le style j'ai utilisé **styled-components**. J'ai choisis cette librairie car elle permet de faire du CSS-in-JS. C'est à dire que le style est directement dans le composant. Cela permet de ne pas avoir de conflit de style.

Pour la gestion des routes j'ai utilisé **next-routes**. Cela permet de gérer les routes de manière plus simple.


## Installation 

Dans votre terminal taper les commandes : 
```bash
git clone git@github.com:Noe-p/tricount-app.git
cd tricount-app 
yarn 
yarn dev
```

## Architecture 

Dans le répertoire **src** vous y trouverez tous les éléments essentiels de l'application : 

  - **components** : 
      Ce répertoire contient tous les composants "réetulisable" pour un autre projet.
  
  - **container** : 
      Ce répertoire contient tous les composants propore à l'application. 

  - **i18n** : 
      Traduction de l'application.

  - **pages** : 
      Point d'entré de l'url des pages.
  
  - **routing** : 
      Les routes de l'application. 
  
  - **service** : 
      Ici, dans **api** vous retrouverez toutes fonction afin de faore les call api. Dans **cookies.ts** les fonctions qui gères les cookies et enfin dans utils des fonctions pratique pour l'application. 
  
  - **themes** : 
      Dans thèmes vous pouvez retrouvez les constantes de couleurs. 

  - **types** : 
      Types correspond à tous les types de l'application : 
      - **api** : Ce que renvois les call api. 
      - **dto** : Ce qu'on doit envoyer pour un call api. 
      - **ui** : Le type pour le front.

Dans chaque répertoire vous pourrez retrouver un **index.ts**, afin de faciliter les imports de chaques composants. 

## Fonctionnalités 
Cette application reprend les fonctionnalités de bases de l'application Tricount à savoir : 
  - Le CRUD d'un utilisateur
  - La sélection d'un utilisateur
  - Le CRUD d'une dépense (titre, l'utilisateur qui fait la dépense, le montant, les participants et une catégorie)
  - La création / suppression d'une catégorie.
  - D'une page pour voir l'équilibre des dépenses
  - L'affichage du coût total et du total des dépenses

J'ai également rajouté la possibiliter de pour changer d'utilisateur.  