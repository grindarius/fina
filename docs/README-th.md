| [Home](README.md) | [ภาษาไทย](docs/README-th.md) |

# FINA
### Fabulous and Interactive Numerical Analysis Calculator

## เครื่องมือที่ใช้
ใน FINA เราใช้
- [Vuejs](https://vuejs.org/) เพื่อจัดการ Web Application ของเรา
- [Buefy](https://buefy.org/) เพื่อจัดการเลย์เอาท์ต่าง ๆ ของ Web Application ของเรา
- [mathjs](https://mathjs.org/) เพื่อจัดการโจทย์ต่าง ๆ ให้สามารถคำนวณได้
- [d3](https://d3js.org/) เพื่อสร้างกราฟสวย ๆ
- [ESLint](https://eslint.org/) เพื่อจัดการสไตล์การเขียน TypeScript ของโปรเจกต์
- [Stylelint](https://stylelint.io/) เพื่อจัดการสไตล์การเขียน SCSS ของโปรเจกต์
- [Vue Katex](https://github.com/lucpotage/vue-katex#readme) เพื่อแสดงสูตรทางคณิตศาสตร์
- [Fastify](https://fastify.io/) เพื่อจัดการ API ของเรา

ภาษาหลักในการพัฒนาคือภาษา [TypeScript](https://www.typescriptlang.org/)

## ติดตั้งโปรเจกต์
ติดตั้ง Firebase CLI
```
npm i -g firebase-tools
firebase login
```
ติดตั้งแพคเกจต่าง ๆ ของโปรเจกต์
```
npm install
```
จากโฟลเดอร์ root ของโปรเจกต์ ถ้าคำสั่งด้านบนไม่สำเร็จ ให้รัน
```
npm install --legacy-peer-deps
```

## เริ่มพัฒนา
รันคอมมานด์เหล่านี้เพื่อเริ่มพัฒนา

| Terminal 1                  | Terminal 2                  | Terminal 3      |
| --------------------------- | --------------------------- | --------------- |
| `npm run serve:common`      | `npm run serve:functions`   | `npm run serve` |

เว็บแอพพลิเคชั่นจะปรากฏตัวที่ `http://localhost:8080` ส่วน API จะปรากฏตัวที่นี่ `http://localhost:3000`

## เป้าหมายระยะยาว

### Grapher component
- [ ] รองรับการวาดกราฟที่ไม่ต่อเนื่อง เช่น $ f(x) = \frac{1}{x} $
- [ ] รองรับการสเกลของกราฟให้ดีขึ้น ขณะนี้ ภาพของกราฟจะค่อย ๆ ชัดขึ้นตามการซูม

### Frontend
- [ ] **เพิ่มเนื้อหาของเทอมสอง**
  - [ ] เกาส์ ไซเดล.
  - [ ] จาโคบี.
  - [ ] ผลต่างสืบเนื่องนิวตัน
  - [ ] ผลต่างสืบเนื่องข้างหน้าของนิวตัน
  - [ ] ผลต่างสืบเนื่องของข้างหลังของนิวตัน
  - [ ] พหุนามลากรองซ์
  - [ ] การวิเคราะห์การถดถอย
  - [ ] กฎสี่เหลี่ยมคางหมู
  - [ ] กฎ 1/3 ของซิมป์สัน
  - [ ] กฎ 3/8 ของซิมป์สัน
  - [ ] วิธีการของรอมเบิร์ก
  - [ ] วิธีการของออยเลอร์
- [ ] แสดง error ที่มีความหมาย
- [ ] พัฒนาการเก็บ input ไว้เหมือน Google Forms ที่ refresh แล้วไม่หาย
- [ ] พัฒนาระบบสมัครสมาชิก
- [ ] รองรับ [i18n](https://en.wikipedia.org/wiki/Internationalization_and_localization) สำหรับเว็บไซต์หลายภาษาโดยใช้ [vue-i18n](https://kazupon.github.io/vue-i18n/)
- [ ] พัฒนาหน้าตาของเว็บไซต์ และคำอธิบายต่าง ๆ
- [ ] นำเว็บไซต์ขึ้น Firebase
- [ ] เพื่มหน้าผู้ร่วมพัฒนา
- [ ] รวมหน้าแสดงคำตอบเป็นหนึ่งเดียว

### Backend
- [ ] เอา `preValidation` hook ที่ซ้ำซ้อน แยกไปเป็นไฟล์ต่างหาก
- [ ] เรียบเรียง `preValidation` hook บางตัวใหม่
- [ ] เพื่ม Authorization ให้กับ API (Bearer)
- [ ] นำ API ขึ้น Cloud Run

## นำขึ้นสู่สาธารณะ
// TODO: Add deployment notes

## การจัดการรูปแบบโค้ด
Run
```
npm run lint
```
จากโฟลเดอร์รูทของโปรเจกต์เพื่อทำการโชว์ error จากการเขียนทั้งหมดที่ ESLint พบ

Run
```
npm run fix
```
จากโฟลเดอร์รูปของโปรเจกต์เพื่อให้ ESLint ทำการพยายามแก้ไขบาง error ง่าย ๆ ให้เรา
