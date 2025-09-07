/** @odoo-module **/

import{Component, useState, onWillStart, onMounted, useRef} from"@odoo/owl";
import{useService} from "@web/core/utils/hooks";
import{ _t } from "@web/core/l10n/translation";

export class SalesDashBoard extends Component {
    static template = "gw_sales_dashboard.SalesDashboard";

    setup(){
        this.state = useState({kpiData: [], isLoading: true});
        this.state = useService("rpc");
        this.busService = useService("bus_service");
        this.root = useRef("root");

        onWillStart(() => this.fetchDashboardData());
        const channel = "sales_dashboard_updates";
        this.busService.addChannel(channel);
        this.busService.addEventListener("notification", ({detial: notification}) => {
            const isupdate =notification.some(n => n.payload.channel === channel);
            if (isupdate){
                console.log("Real-time update recived! Refreshing data.");
                this.fetchDashboardData();
            }
        }) 

        onMounted(() => {
            const container = this.rot.el.querySelector('#kpi-contanier');
            console.log("Drag-and-drop would be initialized on this container:", container);
        });
    
    
    }

    async fetchDashboardData(){
        this.state.isLoading = true
        try{
            const data = await new Promise(resolve => setTimeout(() => resolve([
            {id: 1, title: 'Total Revenue', value: '$50,000'},
            {id: 2, title: 'Total C0GS', value: '$20,000'},
            {id: 3, title: 'Net Margin', value: '$30,000'},
        ]), 500));
        this.state.kpiData = data;                
        await this.saveToCache('kpi_data', data);
    } catch(error) {
        console.warn("server fetch faild. attmepting to load from cache.");
        this.state.kpiData = await this.loadFromCache('kpi_data') || [];
        } finally{
            this.state.isLoading = false;
        }

    }

    async saveToCache(key,data){
        console.log(`Saving ${key} to indexedDB...`);

    }
    async loadFromCache(key){
        console.log(`loading ${key} from indexedDB...`);
        return null;

    }
    saveLayout(){
        console.log("saving the new layout to the localStoarge");
    }


}

