import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from '../../Shared/shared.module';
import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { UserRolesComponent } from './user-roles/user-roles.component';
import { TodoDragDropComponent } from './todo-drag-drop/todo-drag-drop.component';

@NgModule({
  declarations: [SettingsComponent, UserRolesComponent, TodoDragDropComponent],
  imports: [CommonModule, SettingsRoutingModule, SharedModule, CoreModule],
})
export class SettingsModule {}
