export type Jurusan =
  | "Informatika"
  | "Sistem Informasi"
  | "Teknik Elektro"
  | "Manajemen";

export interface Mahasiswa {
  id: number;
  nim: string;
  nama: string;
  email: string;
  jurusan: Jurusan;
  tanggal_lahir?: string;  // optional, pakai ?
  created_at: string;
  updated_at: string;
}