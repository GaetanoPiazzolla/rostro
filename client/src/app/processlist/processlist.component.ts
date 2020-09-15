import { Component, OnInit} from '@angular/core';
import {ProcessService} from '../../services/process.service';
import {Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {NgbTooltip} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-processlist',
    templateUrl: './processlist.component.html',
    styleUrls: ['./processlist.component.less'],
})
export class ProcesslistComponent implements OnInit {

    // enable or disable loading pane
    public loading: Boolean = true;
    public processes: Processes = null;
    public number = 5;
    public orderBy = 'cpu';

    // text string
    public inputValue = '';
    public debouncedInputValue = '';
    private searchDebouncer$: Subject<string> = new Subject();

    constructor(private processService: ProcessService) {

    }

    ngOnInit(): void {
        this.setupSearchDebouncer();
        this.loadProcesses();
    }

    public onSearchInputChange(term: string): void {
        this.inputValue = this.inputValue.toLowerCase();
        this.searchDebouncer$.next(term);
    }

    private setupSearchDebouncer(): void {
        this.searchDebouncer$.pipe(
            debounceTime(250),
            distinctUntilChanged(),
        ).subscribe((term: string) => {
            this.debouncedInputValue = term;
            this.loadProcesses();
        });
    }

    loadProcesses() {
        this.loading = true;
        console.log(this.debouncedInputValue);

        this.processService.findProcesses(this.orderBy, this.number, this.inputValue)
            .subscribe(processes => {
                this.processes = processes;
                this.loading = false;
            });

    }

    // handle clicks
    // ----------------------------

    clickCpu() {
        this.orderBy = 'cpu';
        this.loadProcesses();
    }

    clickMem() {
        this.orderBy = 'mem';
        this.loadProcesses();
    }

    clickNumber(number: number) {
        this.number = number;
        this.loadProcesses();
    }

    clickKill(pid: number) {
        this.loading = true;
        this.processService.killProcess(pid).subscribe(() => {
            this.loadProcesses();
        }, error => {
            console.log(error);
        });
    }

    toggleTooltip(tooltip: NgbTooltip, process: Process) {
        if (tooltip.isOpen()) {
            tooltip.close();
        } else {
            tooltip.open({ process });
        }
    }
}
