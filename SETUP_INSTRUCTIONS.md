# Crescere Website - Quick Setup Instructions

## 🚀 Get Started in 3 Steps

### 1. Install Node.js
Visit [https://nodejs.org](https://nodejs.org) and download Node.js 18.0.0 or higher.

**Verify installation:**
```bash
node --version
npm --version
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔧 Build for Production

```bash
# Create production build
npm run build

# Start production server
npm run start
```

## 📱 What You'll See

- **Hero Section**: "Digitálne podnikanie" with premium design
- **Portfolio**: Three project showcases
- **Contact Form**: Premium form with validation
- **Responsive Design**: Perfect on all devices

## 🎨 Customization

- **Colors**: Edit `tailwind.config.js`
- **Content**: Modify component files in `src/components/`
- **Logo**: Update `src/components/Logo.tsx`

## 🚀 Deploy to Production

**Recommended: Vercel**
```bash
npm i -g vercel
vercel login
vercel
```

## 🆘 Need Help?

- Check the `README.md` for detailed documentation
- Review `DEPLOYMENT_GUIDE.md` for deployment options
- All components are documented with clear examples

---

**The website is production-ready and will work perfectly once Node.js is installed!**
