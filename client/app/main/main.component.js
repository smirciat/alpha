import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SocketService } from '../../components/socket/socket.service';

@Component({
    selector: 'main',
    template: require('./main.html'),
    styles: [require('./main.scss')],
})
export class MainComponent {
    SocketService;
    awesomeThings = [];
    newThing = '';

    static parameters = [HttpClient, SocketService];
    constructor(http, socketService) {
        this.http = http;
        this.SocketService = socketService;
    }

    ngOnInit() {
        return this.http.get('/api/things')
            .subscribe(([]) => {
                this.awesomeThings = things;
                this.SocketService.syncUpdates('thing', this.awesomeThings);
            });
    }


    ngOnDestroy() {
        this.SocketService.unsyncUpdates('thing');
    }

    addThing() {
        if(this.newThing) {
            let text = this.newThing;
            this.newThing = '';

            return this.http.post('/api/things', { name: text })
                .subscribe(thing => {
                    console.log('Added Thing:', thing);
                });
        }
    }

    deleteThing(thing) {
        return this.http.delete(`/api/things/${thing._id}`)
            .subscribe(() => {
                console.log('Deleted Thing');
            });
    }
}
