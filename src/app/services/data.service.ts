import { Injectable } from '@angular/core';
import { Kategori } from '../models/kategori';
import { Uye } from '../models/uye';
import { HttpClient } from '@angular/common/http';
import { collection, collectionData, deleteDoc, doc, docData, Firestore, query, setDoc, where } from '@angular/fire/firestore';
import { concatMap, from, map, Observable, of, switchMap, take } from 'rxjs';
import { addDoc, updateDoc } from '@firebase/firestore';
import {
  Auth,
  authState,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  User,
  UserInfo,
} from '@angular/fire/auth';
import {
  getDownloadURL,
  ref,
  Storage,
  uploadBytes,
} from '@angular/fire/storage';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  aktifUye = authState(this.auth)

  constructor(
    public http: HttpClient,
    public auth: Auth,
    public fs: Firestore
  ) { }

  KayitOl(mail: string, parola: string){
    return from(createUserWithEmailAndPassword(this.auth,mail,parola));
  }
  OturumAc(mail: string, parola:string){
    return from(signInWithEmailAndPassword(this.auth, mail,parola));
  }
  OturumKapat(){
    return(this.auth.signOut());
  };

  get AktifUyeBilgi() {
    return this.aktifUye.pipe(
      switchMap((user) => {
        if (!user?.uid) {
          return of(null);
        }
        const ref = doc(this.fs, 'Uyeler', user?.uid);
        return docData(ref) as Observable<Uye>;
      })
    );
  }

  KategoriListele() {
    var ref = collection(this.fs,"Categories")
    return collectionData(ref, { idField: 'katId' }) as Observable<Kategori[]>
  }
  KategoriById(id: string) {
    const ref = doc(this.fs, "Categories/"+ id)
    return docData(ref) as Observable<Kategori>  
  }
  KategoriEkle(kat: Kategori) {
    var ref = collection(this.fs, "Categories");
    return addDoc(ref, kat)
  }
  KategoriDuzenle(kat: Kategori) {
    var ref = doc(this.fs, "Categories/" + kat.katId);
    return updateDoc(ref, { ...kat });
  }
  KategoriSil(kat: Kategori) {
    var ref = doc(this.fs,"Categories/"+ kat.katId);
    return deleteDoc(ref);
  }
  /* kategori servis bitiş*/

  /* Uye servis başla*/

  UyeListele() {
    var ref = collection(this.fs, "Uyeler");
    return collectionData(ref, { idField: 'uid' }) as Observable<Uye[]>;
  }
  UyeById(id: number) {
    const ref = doc(this.fs, "Uyeler/"+ id)
    return from(docData(ref)) as Observable<Uye>
  }
  UyeEkle(uye: Uye) {
    var ref = doc(this.fs, 'Uyeler', uye.uid);
    return from(setDoc(ref, uye));
  }
  UyeDuzenle(uye: Uye) {
    var ref = doc(this.fs, "Uyeler", uye.uid);
    return from(updateDoc(ref, { ...uye }));
  }
  UyeSil(uye: Uye) {
    var ref = doc(this.fs, "Uyeler", uye.uid);
    return from(deleteDoc(ref));
  }
}
