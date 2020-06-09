import { Component, OnInit } from '@angular/core';
import { MapTheme } from 'src/app/models/MapTheme.model';
import { MapEditorService } from 'src/app/services/map-editor.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-themes',
  templateUrl: './themes.component.html',
  styleUrls: ['./themes.component.scss']
})
export class ThemesComponent implements OnInit {

    private themes: MapTheme[];
    private themeSelect: FormControl;

    constructor(private mapEditorService: MapEditorService) { }

    ngOnInit() {

        this.themeSelect = new FormControl(this.mapEditorService.theme.value._id);
        this.mapEditorService.getThemePage().subscribe((themes) => {
            this.themes = themes;
        });

        this.themeSelect.valueChanges.subscribe((theme)=>{
            this.changeTheme(theme)
        })
    }

    private changeTheme(theme) {
        this.mapEditorService.getThemeById(theme).subscribe((themeFull) => {
            this.mapEditorService.fullThemePush(themeFull);
        });
    }

}
