# V1st Nutrition — Surat Flagship Sports Nutrition Store & 3D Web App

Permanent, 24/7 production-ready full-stack web application for **V1st Nutrition**, a sports nutrition and supplement retail store located at **Shivashta Complex, Velanja Rd, Ramvatika Society, Kathor, Velanja, Surat, Gujarat 394150**.

---

## ⚡ Key Highlights & Architecture

1. **Photorealistic 3D Hero Canister (`<Hero3DSupplement />`)**:
   - Built with `@react-three/fiber` and `@react-three/drei`.
   - **Tactile Procedural Geometry**: Matte carbon-black container body, heavy ribbed titanium grip lid, chamfered rim ridges.
   - **Dynamic HTML5 Canvas Label Texture**: Programmatically renders "V1ST NUTRITION", "100% WHEY ISOLATE", "25G PROTEIN | 5.5G BCAA", FSSAI license, metallic authenticity seal badge, and a **flavor stripe that dynamically changes color** when flavor pills are selected on the hero UI.
   - **360° Inspection & Nutrition Facts**: Click "Inspect Label" to smoothly spin the canister 180° to inspect the back nutrition facts table, barcode, and Surat store distribution details.
   - **Inertial Physics & Parallax Tilt**: Tracks mouse movements to gently tilt the canister with mass and damping; click-and-drag with angular momentum decay.
   - **Studio Lighting**: Directional emerald rim backlighting (`#10B981`) + warm golden key light (`#F59E0B`) + soft ambient light + `<ContactShadows>` on invisible studio floor.
   - **Suspended Micro-Particles**: Floating emerald & amber gold protein energy sparkles drifting in 3D space.

2. **Surat Local E-Commerce & WhatsApp Order Automation**:
   - **WhatsApp 1-Click Order Generation**: Instant automated WhatsApp order link containing customer name, mobile number, item breakdown (flavors & sizes), subtotal, discount, delivery selection, and store address.
   - **Delivery Options**:
     - 🏪 **Store Counter Pickup**: Free 15-minute pickup at Shivashta Complex, Velanja Rd.
     - 🚚 **Surat Express Delivery**: Same-day delivery across Velanja, Kathor, Sarthana, Nana Varachha, Katargam, Adajan, Vesu, and all Surat pin codes.
   - **Coupon System**: `SURATFIT` (10% off) and `V1STNEW` (₹200 instant discount).

3. **Authenticity & NABL Lab Test Batch Verifier**:
   - Enter batch numbers (e.g. `V1ST-2026-WH01`, `ON-2026-GLD9`, `MB-2026-BZ44`, `V1ST-2026-CR02`) to inspect real-time Certificate of Analysis, tested purity percentage (93.8% protein purity), FSSAI Central license, NABL report ID, and manufacturing/expiry dates.

4. **Admin Dashboard (`/admin`)**:
   - Secure login with JWT authentication (`admin@v1stnutrition.com` / `V1st@Surat2026`).
   - Store KPIs: Total Revenue (₹), Active Orders, Catalog Stock, and Database Status.
   - Inventory Management: Add new supplement products, update pricing, toggle in-stock status, delete items.
   - Orders Stream: View customer orders, update statuses (Pending, Confirmed, Dispatched, Completed), and 1-click WhatsApp customer reply.
   - Batch Registry Manager: Inspect and verify laboratory batch entries.

5. **24/7 Keep-Alive & Cloud Deployment**:
   - Backend on Render: `/api/health` endpoint returning uptime, system timestamp, and store status for UptimeRobot monitoring.
   - Frontend on Vercel: Includes `vercel.json` SPA rewrites.
   - Dual-Mode Resilience: If MongoDB Atlas URI is not yet configured, the system operates seamlessly with its built-in in-memory catalog, ensuring 100% zero-downtime demo mode.

---

## 🚀 Running Locally

### 1. Backend Setup
```bash
cd backend
npm install
npm run dev
# Server boots at http://localhost:5000 (Health check: http://localhost:5000/api/health)
```

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
# App boots at http://localhost:5173
```

---

## 📍 Store Information
- **Store Name:** V1st Nutrition
- **Address:** Shivashta Complex, Velanja Rd, Ramvatika Society, Kathor, Velanja, Surat, Gujarat 394150
- **FSSAI License:** 10723026000412
- **Hours:** Mon–Sat 9:00 AM – 10:00 PM | Sun 10:00 AM – 8:00 PM
- **Contact:** +91 98765 43210
