import { Injectable, EventEmitter } from "@angular/core";

@Injectable({
    providedIn:"root"
})

export class EmmiterService {
    handleChildPost: EventEmitter<Object> = new EventEmitter();
    hadlePostDelete:EventEmitter<Object> = new EventEmitter();
}