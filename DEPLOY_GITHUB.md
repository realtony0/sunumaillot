# Instructions pour déployer sur GitHub

## ✅ Étape 1 : Créer le repository sur GitHub

1. Allez sur https://github.com/new
2. Nom du repository : `sunumaillot` (ou le nom de votre choix)
3. Description : "Site e-commerce maillots Sénégal CAN 2025"
4. Choisissez **Public** ou **Private**
5. **NE COCHEZ PAS** "Initialize this repository with a README" (on a déjà un README)
6. Cliquez sur **Create repository**

## ✅ Étape 2 : Connecter le repo local à GitHub

Une fois le repo créé, GitHub vous donnera une URL. Exécutez ces commandes :

```bash
cd "/Users/admin/Desktop/sen maillot"
git remote add origin https://github.com/VOTRE_USERNAME/sunumaillot.git
git branch -M main
git push -u origin main
```

**Remplacez `VOTRE_USERNAME` par votre nom d'utilisateur GitHub.**

## ✅ Alternative : Si vous avez déjà un repo

Si le repo existe déjà, utilisez simplement :

```bash
git remote add origin https://github.com/VOTRE_USERNAME/sunumaillot.git
git push -u origin main
```

## 📝 Note

Le code est déjà commité et prêt à être poussé. Il suffit d'ajouter le remote et de push.

