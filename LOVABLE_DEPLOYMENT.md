# 🚀 **LOVABLE DEPLOYMENT GUIDE FOR CRESCERE WEBSITE**

## **📋 Overview**
This guide will walk you through deploying your Crescere website to Lovable platform with your custom domain `www.crescere.sk`.

## **✅ Pre-Deployment Checklist**
- [x] **Code**: Production ready (confirmed)
- [x] **Build**: Successful compilation
- [x] **Lint**: No errors
- [x] **Metadata**: Complete with proper base URL
- [x] **OG Images**: Created and configured
- [x] **Mobile**: Responsive design verified
- [x] **Contact Form**: API endpoint ready
- [x] **Git Repository**: Clean and committed

## **🌐 Step 1: Push to GitHub**

### **1.1 Create GitHub Repository**
1. Go to [github.com](https://github.com)
2. Click "New repository"
3. Name: `crescere-website`
4. Description: "Premium website for Crescere - Digital Business Solutions"
5. Make it **Public** (required for free hosting)
6. Click "Create repository"

### **1.2 Connect and Push Your Code**
```bash
# Add GitHub as remote origin
git remote add origin https://github.com/YOUR_USERNAME/crescere-website.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## **🚀 Step 2: Deploy to Lovable**

### **2.1 Access Lovable**
1. Go to [lovable.dev](https://lovable.dev)
2. Sign up/Login with GitHub
3. Click "New Project"

### **2.2 Import Your Repository**
1. **Select Repository**: Choose `crescere-website`
2. **Framework**: Select `Next.js`
3. **Build Command**: `npm run build`
4. **Output Directory**: `.next`
5. **Install Command**: `npm install`
6. **Node Version**: `18` (or higher)

### **2.3 Environment Variables**
Add these in Lovable dashboard:

```env
# SMTP Configuration
SMTP_HOST=smtp.websupport.sk
SMTP_PORT=587
SMTP_USER=your-email@crescere.sk
SMTP_PASS=your-email-password
SMTP_FROM=noreply@crescere.sk
CONTACT_EMAIL=tomas@crescere.sk

# Next.js Configuration
NODE_ENV=production
```

### **2.4 Deploy Settings**
- **Auto Deploy**: Enable (deploys on every push)
- **Branch**: `main`
- **Build Timeout**: 10 minutes
- **Node Version**: 18.x

## **🌐 Step 3: Configure Custom Domain**

### **3.1 Add Domain in Lovable**
1. Go to your project settings
2. Click "Domains"
3. Add custom domain: `www.crescere.sk`
4. Lovable will provide DNS records

### **3.2 Configure DNS Records**
Add these records with your domain provider:

```
Type: A
Name: @
Value: [LOVABLE_IP_ADDRESS] (provided by Lovable)

Type: CNAME
Name: www
Value: [LOVABLE_DOMAIN] (provided by Lovable)
```

### **3.3 SSL Certificate**
- Lovable automatically provides SSL certificates
- Wait 24-48 hours for full propagation

## **🔧 Step 4: Post-Deployment Configuration**

### **4.1 Test Your Website**
1. Visit `www.crescere.sk`
2. Verify all pages load correctly
3. Test contact form functionality
4. Check mobile responsiveness

### **4.2 Verify SMTP**
1. Send test message through contact form
2. Check email delivery
3. Verify auto-reply emails

### **4.3 Performance Check**
1. Run Lighthouse audit
2. Verify Core Web Vitals
3. Check loading speeds

## **📱 Mobile Testing Checklist**

- [ ] **Hero Section**: Two-row heading displays correctly
- [ ] **Navigation**: Mobile menu works on all screen sizes
- [ ] **Portfolio**: Grid adapts to mobile screens
- [ ] **Contact Form**: Touch-friendly on mobile devices
- [ ] **Footer**: All links accessible on small screens

## **🚨 Troubleshooting**

### **Build Failures**
```bash
# Check build locally first
npm run build

# Verify all dependencies are in package.json
npm install

# Check for TypeScript errors
npm run lint
```

### **Domain Issues**
- DNS propagation can take 24-48 hours
- Verify DNS records are correct
- Check domain provider settings

### **SMTP Issues**
- Verify environment variables are set
- Check SMTP credentials
- Test with different email providers

## **🔒 Security Considerations**

- ✅ **HTTPS**: Automatically provided by Lovable
- ✅ **Security Headers**: Configured in next.config.js
- ✅ **Input Validation**: Implemented in contact form
- ✅ **GDPR Compliance**: Cookie consent and data handling

## **📊 Monitoring & Analytics**

### **Performance Monitoring**
- Lovable provides basic analytics
- Consider adding Google Analytics
- Monitor Core Web Vitals

### **Uptime Monitoring**
- Lovable includes uptime monitoring
- Set up alerts for downtime
- Monitor response times

## **🔄 Continuous Deployment**

### **Automatic Deployments**
- Every push to `main` branch triggers deployment
- Build and deploy automatically
- Rollback to previous versions if needed

### **Manual Deployments**
- Trigger manual deployments from Lovable dashboard
- Deploy specific branches for testing
- Preview deployments before going live

## **📞 Support & Resources**

### **Lovable Support**
- [Lovable Documentation](https://docs.lovable.dev)
- [Community Forum](https://community.lovable.dev)
- [Support Email](mailto:support@lovable.dev)

### **Next.js Resources**
- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Deployment Guide](https://vercel.com/docs)
- [Performance Optimization](https://nextjs.org/docs/advanced-features/performance)

## **🎯 Success Metrics**

After deployment, verify:
- ✅ Website loads at `www.crescere.sk`
- ✅ All pages render correctly
- ✅ Contact form sends emails
- ✅ Mobile experience is optimal
- ✅ Social media sharing works
- ✅ SSL certificate is active
- ✅ Performance scores are high

## **🚀 Ready to Deploy!**

Your Crescere website is now ready for Lovable deployment. Follow these steps and you'll have a professional, mobile-optimized website running on your custom domain in no time!

**Need help?** The Lovable team is very supportive and can assist with any deployment issues.
