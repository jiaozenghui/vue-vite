let comps_sum = [
    {
        idd: 'layout', title: 'Layouts', type:'layout', children: [
            {idd: '1_col',title: '1 Cols', type:'layout',comp_name: 'Layouts',
                confs: {gutterKey: 0, vgutterKey:0, colCountKey:1},
                cols:[
                    {idd: '1_col_1',title: '2 Cols', type:'col', span: 24, comps:[]}
                ]
            },
            {idd: '2_col',title: '2 Cols', type:'layout',comp_name: 'Layouts',
                cols:[
                    {idd: '2_col_1',title: '2 Cols', type:'col', span: 12, comps:[]},
                    {idd: '2_col_2',title: '2 Cols', type:'col', span: 12, comps:[]}
                ]
            },
            {idd: '3_col',title: '3 Cols', type:'layout',comp_name: 'Layouts',
                cols:[
                    {idd: '3_col_1',title: '2 Cols', type:'col', span: 8, comps:[]},
                    {idd: '3_col_2',title: '2 Cols', type:'col', span: 8, comps:[]},
                    {idd: '3_col_3',title: '2 Cols', type:'col', span: 8, comps:[]}
                ]
            },
            {idd: '4_col',title: '4 Cols', type:'layout',comp_name: 'Layouts',
                cols:[
                    {idd: '4_col_1',title: '2 Cols', type:'col', span: 6, comps:[]},
                    {idd: '4_col_2',title: '2 Cols', type:'col', span: 6, comps:[]},
                    {idd: '4_col_3',title: '2 Cols', type:'col', span: 6, comps:[]},
                    {idd: '4_col_4',title: '2 Cols', type:'col', span: 6, comps:[]}
                ]
            }
        ]
    },
    {
        idd: 'basic', title: 'Basic Components', type:'basic', children: [
            {idd: 'basic_1',title: 'Button', type:'button', comp_name: 'LButton', comp_confs:{title: 'test'}},
            {idd: 'basic_2',title: 'Select', type:'select', comp_name: 'Select'}
        ]
    }
];
export default {
    comps_sum,
    list: [] as any,
    compType: 'layout',
    drawer_conf: {
        visible: false
    } as any
}
