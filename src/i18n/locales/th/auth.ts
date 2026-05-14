import type { AuthNS } from '@/i18n/locales/en/auth';

export const auth: AuthNS = {
  appName: 'รายชื่อลูกค้า',
  tagline: 'เข้าสู่ระบบเพื่อจัดการลูกค้าของคุณ',
  title: 'เข้าสู่ระบบ',
  fields: {
    username: 'ชื่อผู้ใช้',
    password: 'รหัสผ่าน',
  },
  placeholders: {
    username: 'กรอกชื่อผู้ใช้',
    password: 'กรอกรหัสผ่าน',
  },
  submit: 'เข้าสู่ระบบ',
  validation: {
    usernameTooShort: 'ชื่อผู้ใช้ต้องมีอย่างน้อย 2 ตัวอักษร',
    passwordTooShort: 'รหัสผ่านต้องมีอย่างน้อย 4 ตัวอักษร',
  },
  hint: {
    title: 'ข้อมูลสำหรับทดสอบ',
    username: 'ชื่อผู้ใช้',
    password: 'รหัสผ่าน',
  },
};
