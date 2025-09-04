# -*- coding: utf-8 -*-
{
    'name': 'GW Sales Dashboard',
    'version': '1.0',
    'summary': 'A real-time sales analytics dashboard component.',
    'author': 'Mohammad al ariefy',
    'category': 'Sales',
    'depends': ['web', 'sale_management'],
    'assets': {
        'web.assets_backend': [
            'gw_sales_dashboard/static/src/components/sales_dashboard/sales_dashboard.js',
            'gw_sales_dashboard/static/src/components/sales_dashboard/sales_dashboard.xml',
        ],
    },
    'installable': True,
    'application': False,
    'auto_install': False,
}