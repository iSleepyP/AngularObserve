import { Injectable,EventEmitter } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({providedIn:'root'})//shortcut if not add in app.module
export class UserService{
    //activatedEmitter = new EventEmitter<boolean>();
    activatedEmitter = new Subject<boolean>();
}