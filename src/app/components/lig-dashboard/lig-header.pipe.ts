import { Pipe, PipeTransform   } from "@angular/core"
import { LigDashboardTableHeadersApiMapping } from "../../models/lig-dashboard-data.model"


@Pipe({
    name: 'ligHeader'
})
export class LigHeaderPipe implements PipeTransform{
    transform(value:string): string {
        const headerVal = LigDashboardTableHeadersApiMapping.get(value)
        return headerVal ? headerVal : " Default Header";
    }
}