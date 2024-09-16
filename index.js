let data = {

    preInit: function () {
        this.dataJson = getJson();
        this.dataArrayLineas = getIndicadoresMeses();
        this.dataJsonCol = DepMunColombia();
        
        this.initGrafico1(); 
        this.initGrafico2();
        this.initGrafico3();
        this.initGrafico4(); 
        this.initGrafico5();
        this.initGrafico6();
        this.initGrafico7();
        this.initGrafico8();
        this.initGrafico9();
    },

    initGrafico1: function(){
        let SubMasc = 0;
        let SubFem = 0;
        let ContMasc = 0;
        let ContFem = 0;
        
        this.dataJson.forEach(element => {
            
            if (element.sexo === "M" && element.regimen === "sub" ) {
                SubMasc++
            }
            if (element.sexo === "M" && element.regimen === "cont" ) {
                ContMasc++
            }
            if (element.sexo === "F" && element.regimen === "sub" ) {
                SubFem++
            }
            if (element.sexo === "F" && element.regimen === "cont" ) {
                ContFem++
            }
            
        });
        


        Highcharts.chart('container1', { 
            chart: {
                type: 'column'
            },
            title: {
                text: '',
            },
            subtitle: {
                text: '',
            },
            xAxis: {
                categories: ['Masculino', 'Femenino'],
                crosshair: true,
                accessibility: {
                    description: 'Countries'
                }
            },
            yAxis: {
                min: 0,
                max: 50,
                title: {
                    text: 'Total (S/C)'
                }
            },
            tooltip: {
                valueSuffix: ' '
            },
            plotOptions: {
                column: {
                    cursor: 'pointer',
                    point: {
                        events: {
                            click: function(event) {
                                let categoria = event.point.category;
                                let value = event.point.y;
                                let regimen = event.point.series.name;
                                let genero = categoria === 'Masculino' ? 'Masculino' : 'Femenino';
                                let estado = regimen === 'Subsidiado' ? 'Subsidiado' : 'Contributivo';
        
                                // Mostrar modal con información
                                $.messager.alert('Detalle de la Barra', `${genero} - ${estado}: ${value}`, 'info');
                            }
                        }
                    }
                }
            },
            series: [
                {
                    name: 'Subsidiado',
                    data: [SubMasc,SubFem],
                    color: '#0399f7'
                },
                {
                    name: 'Contributivo',
                    data: [ContMasc,ContFem],
                    color: '#ff4b48'
                },
            ]
        });



    },


    initGrafico2: function(){
        let Subsidiado = this.dataArrayLineas[0];
        let Contributivo = this.dataArrayLineas[1]


        Highcharts.chart('container2', {
            chart: {
                type: 'line'
            },
            title: {
                text: ''
            },
            subtitle: {
                text: '' 
            },
            xAxis: {
                categories: [
                    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
                    'Oct', 'Nov', 'Dec'
                ]
            },
            yAxis: {
                title: {
                    text: 'Temperature (°C)'
                }
            },
            plotOptions: {
                line: {
                    dataLabels: {
                        enabled: true
                    },
                    enableMouseTracking: false
                }
            },
            series: [{
                name: 'Subsidiado',
                data: [
                    Subsidiado.Jun, Subsidiado.Feb, Subsidiado.Mar, Subsidiado.Apr, Subsidiado.May, Subsidiado.Jun,
                    Subsidiado.Jul, Subsidiado.Aug, Subsidiado.Sep, Subsidiado.Oct, Subsidiado.Nov, Subsidiado.Dec
                ],
                color : '#ffd760'
            }, {
                name: 'Contributivo',
                data: [
                    Contributivo.Jun, Contributivo.Feb, Contributivo.Mar, Contributivo.Apr, Contributivo.May, Contributivo.Jun,
                    Contributivo.Jul, Contributivo.Aug, Contributivo.Sep, Contributivo.Oct, Contributivo.Nov, Contributivo.Dec
                ],
                color : '#341806'
            }]
        });


    },


    initGrafico3: function(){
        let Sub = 0;
        let Cont = 0;

        this.dataJson.forEach(element => {
            if (element.regimen === "sub") {
                Sub++
            }
            if (element.regimen === "cont") {
                Cont++
            }

        });


        Highcharts.chart('container3', {
            chart: {
                type: 'pie'
            },
            title: {
                text: ''
            },
            tooltip: {
                valueSuffix: '%'
            },
            subtitle: {
                text:
                ''
            },
            plotOptions: {
                series: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    events: {
                        click: function (event) {
                            if (event.point.select) {
                                $.messager.alert('Información', `Has seleccionado: ${event.point.name} con valor: ${event.point.y}`);
                            }
                        }
                    },
                    dataLabels: [{
                        enabled: true,
                        distance: 20
                    }, {
                        enabled: true,
                        distance: -40,
                        format: '{point.percentage:.1f}%',
                        style: {
                            fontSize: '1.2em',
                            textOutline: 'none',
                            opacity: 0.7
                        },
                        filter: {
                            operator: '>',
                            property: 'percentage',
                            value: 10
                        }
                    }]
                }
            },
            series: [
                {
                    name: 'Porcentaje',
                    colorByPoint: true,
                    data: [
                        {
                            name: 'Subsidiados',
                            y: Sub,
                            color: '#17a58c'
                        },
                        {
                            name: 'Contributivo',
                            y: Cont,
                            color: '#8a3a8d'
                        },
                    
                    ]
                }
            ]
        });


    },




    // addEdad: function (genero, pos, dataGrafico){
    //     let valAnt = 0;

    //     if (genero == "M") {
    //         valAnt = dataGrafico[0].data[pos];
    //         dataGrafico[0].data[pos] = valAnt-1;
    //     }

    //     if (genero == "F") {
    //         valAnt = dataGrafico[1].data[pos];
    //         dataGrafico[1].data[pos] = valAnt+1;
    //     }
    // },

    // initGrafico4: function (){
    //     this.dataJson = getJson();

    //     const categories = [
    //         '0-4', '5-9', '10-14', '15-19', '20-24', '25-29', '30-34', '35-40', '40-45',
    //         '45-49', '50-54', '55-59', '60-64', '65-69', '70-74', '75-79', '80-84',
    //         '85+'
    //         ];

    //     let dataGrafico = [
    //         { name: 'Hombres', data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
    //         { name: 'Mujeres', data: [0, 0, 0, 0, 0, 0, 0, 0, 0,0, 0, 0, 0, 0, 0, 0, 0, 0] }
    //     ];

    //     let arrayData = Array.from(this.dataJson);
    //     for (let i = 0; i < arrayData.length; i++) {
    //         const data = arrayData[i];

    //         let edad = parseInt(data.edad);

    //         if(edad >= 0 && edad <= 4){
    //             this.addEdad(data.sexo, 0, dataGrafico);
    //         }
    //         if(edad >= 5 && edad <= 9){
    //             this.addEdad(data.sexo, 1, dataGrafico);
    //         }
    //         if(edad >= 10 && edad <= 14){
    //             this.addEdad(data.sexo, 2, dataGrafico);
    //         }
    //         if(edad >= 15 && edad <= 19){
    //             this.addEdad(data.sexo, 3, dataGrafico);
    //         }
    //         if(edad >= 20 && edad <= 24){
    //             this.addEdad(data.sexo, 4, dataGrafico);
    //         }
    //         if(edad >= 25 && edad <= 29){
    //             this.addEdad(data.sexo, 5, dataGrafico);
    //         }
    //         if(edad >= 30 && edad <= 34){
    //             this.addEdad(data.sexo, 6, dataGrafico);
    //         }
    //         if(edad >= 35 && edad <= 39){
    //             this.addEdad(data.sexo, 7, dataGrafico);
    //         }
    //         if(edad >= 40 && edad <= 44){
    //             this.addEdad(data.sexo, 8, dataGrafico);
    //         }
    //         if(edad >= 45 && edad <= 49){
    //             this.addEdad(data.sexo, 9, dataGrafico);
    //         }
    //         if(edad >= 50 && edad <= 54){
    //             this.addEdad(data.sexo, 10, dataGrafico);
    //         }
    //         if(edad >= 55 && edad <= 59){
    //             this.addEdad(data.sexo, 11, dataGrafico);
    //         }
    //         if(edad >= 60 && edad <= 64){
    //             this.addEdad(data.sexo, 12, dataGrafico);
    //         }
    //         if(edad >= 65 && edad <= 69){
    //             this.addEdad(data.sexo, 13, dataGrafico);
    //         }
    //         if(edad >= 70 && edad <= 74){
    //             this.addEdad(data.sexo, 14, dataGrafico);
    //         }
    //         if(edad >= 75 && edad <= 79){
    //             this.addEdad(data.sexo, 15, dataGrafico);
    //         }
    //         if(edad >= 80 && edad <= 84){
    //             this.addEdad(data.sexo, 16, dataGrafico);
    //         }
    //         if(edad >= 85){
    //             this.addEdad(data.sexo, 17, dataGrafico);
    //         }
            
            
    //     }    

    //     console.log(arrayData);
        
    //     Highcharts.Templating.helpers.abs = value => Math.abs(value);
    
    // // Age categories
    
    
    //     Highcharts.chart('container4', {
    //     chart: {
    //         type: 'bar'
    //     },
    //     accessibility: {
    //         point: {
    //             valueDescriptionFormat: '{index}. Age {xDescription}, {value}%.'
    //         }
    //     },
    //     xAxis: [{
    //         categories: categories,
    //         reversed: false,
    //         labels: {
    //             step: 1
    //         },
    //         accessibility: {
    //             description: 'Age (male)'
    //         }
    //     }, { // mirror axis on right side
    //         opposite: true,
    //         reversed: false,
    //         categories: categories,
    //         linkedTo: 0,
    //         labels: {
    //             step: 1
    //         },
    //         accessibility: {
    //             description: 'Age (female)'
    //         }
    //     }],
    //     yAxis: {
    //         title: {
    //             text: null
    //         },
    //         labels: {
    //             format: '{abs value}%'
    //         },
    //         accessibility: {
    //             description: 'Percentage population',
    //             rangeDescription: 'Range: 0 to 5%'
    //         }
    //     },
        
    //     plotOptions: {
    //         series: {
    //             stacking: 'normal',
    //             borderRadius: '50%'
    //         }
    //     },
        
    //     tooltip: {
    //         format: '<b>{series.name}, age {point.category}</b><br/>' +
    //             'Population: {(abs point.y):.2f}%'
    //     },
        
    //     series: dataGrafico
    //     });
    //     },




    initGrafico4: function () {

        const categories = [
            '0-4', '5-9', '10-14', '15-19', '20-24', '25-29', '30-34', '35-39', '40-44',
            '45-49', '50-54', '55-59', '60-64', '65-69', '70-74', '75-79', '80-84',
            '85-89', '90-94', '100-150'
        ];
    
        let dataGrafico = [
            { name: 'Hombres', data: new Array(categories.length).fill(0) },
            { name: 'Mujeres', data: new Array(categories.length).fill(0) }
        ];
    
        this.dataJson.forEach(function (data) {
            const edad = parseInt(data.edad);
    
            let index;
            if (edad >= 0 && edad <= 99) {
                index = Math.floor(edad / 5);
            } else if (edad >= 100) {
                index = categories.length - 1;
            }
    
            if (data.sexo === "M") {
                dataGrafico[0].data[index]++;
            } else if (data.sexo === "F") {
                dataGrafico[1].data[index]++;
            }
        });
    
        // Invertir los datos para los hombres para que las barras vayan hacia la izquierda
        dataGrafico[0].data = dataGrafico[0].data.map(value => -value);
    
        Highcharts.chart('container4', {
            chart: { type: 'bar' },
        
            title: {
                text: ''
            },
            xAxis: [{
                categories: categories,
                reversed: false,
                labels: {
                    step: 1
                }
            }, {
                opposite: true,
                reversed: false,
                categories: categories,
                linkedTo: 0,
                labels: {
                    step: 1
                }
            }],
            yAxis: {
                title: {
                    text: null
                },
                labels: {
                    formatter: function () {
                        return Math.abs(this.value);
                    }
                }
            },
            plotOptions: {
                series: {
                    stacking: 'normal'
                }
            },
            tooltip: {
                formatter: function () {
                    return `<b>${this.series.name}, edad ${this.point.category}</b><br/>Población: ${Math.abs(this.point.y)}`;
                }
            },
            series: [
                {
                    name: 'Hombres',
                    data: dataGrafico[0].data,
                    color: '#1E90FF' // Color azul para hombres
                },
                {
                    name: 'Mujeres',
                    data: dataGrafico[1].data,
                    color: '#9370DB' // Color morado para mujeres
                }
            ]
        });
    },



    initGrafico5: function (){
        
        let HabitantesMedallo = 0;
        let HabitantesBogota = 0;
        let HabitantesBello = 0;
        let HabitantesPasto = 0;

        this.dataJson.forEach(function(element) {
            if (element.ciudad === 'medellin') {
                HabitantesMedallo++;
            }
            if (element.ciudad === 'bogota') {
                HabitantesBogota++;
            }
            if (element.ciudad === 'bello') {
                HabitantesBello++;
            }
            if (element.ciudad === 'pasto') {
                HabitantesPasto++;
            };
        });


        Highcharts.chart('container5', {
            chart: { type: 'heatmap' },
    
            series: [{
                type: 'treemap',
                layoutAlgorithm: 'squarified',
                clip: false,
                data: [{
                    name: 'Medellín',
                    value: HabitantesMedallo,
                    color: 'red'
                }, {
                    name: 'Bello',
                    value: HabitantesBogota,
                    color: 'green'
                }, {
                    name: 'Bogotá',
                    value: HabitantesBello,
                    color: 'yellow'
                }, {
                    name: 'Pasto',
                    value: HabitantesPasto,
                    color: 'white'
                },
                ]
            }],
            title: {
                text: ''
            },
            plotOptions: {
                series: {
                    point: {
                        events: {
                            click: function () {
                                let randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
                                this.update({ color: randomColor });
                            }
                        }
                    }
                }
            }
        });
        

    },


    initGrafico6: function(){

        this.dataJson = getJson();

        let objMunicipios = {};
        this.dataJson.forEach(function (item) {
            objMunicipios[item.ciudad] = item.coordenadas;
        });

        let arrayMun = [];

        for (const key in objMunicipios) {
            let nombreMun = key;
            let coord = objMunicipios[key];

            let obj = {};
            obj.name = nombreMun;
            obj.lat = parseFloat(coord.split(",")[0]);
            obj.lon = parseFloat(coord.split(",")[1]);
            arrayMun.push(obj);
            
        }

        (async () => {

            const topology = await fetch(
                'https://code.highcharts.com/mapdata/countries/co/co-all.topo.json'
            ).then(response => response.json());
        
            // Initialize the chart
            Highcharts.mapChart('container6', {
        
                chart: {
                    map: topology
                },
        
                title: {
                    text: ''
                },
        
                accessibility: {
                    description: ''
                },
        
                mapNavigation: {
                    enabled: true
                },
        
                tooltip: {
                    headerFormat: '',
                    pointFormat: '<b>{point.name}</b><br>Lat: {point.lat}, Lon: ' +
                        '{point.lon}'
                },
        
                series: [{
                    name: 'Colombia',
                    borderColor: '#A0A0A0',
                    nullColor: 'rgba(200, 200, 200, 0.3)',
                    showInLegend: false
                }, {
                    name: 'Separators',
                    type: 'mapline',
                    nullColor: '#707070',
                    showInLegend: false,
                    enableMouseTracking: false,
                    accessibility: {
                        enabled: false
                    }
                }, {
                    // Specify points using lat/lon
                    type: 'mappoint',
                    name: 'Municipios',
                    accessibility: {
                        point: {
                            valueDescriptionFormat: '{xDescription}. Lat: ' +
                                '{point.lat:.2f}, lon: {point.lon:.2f}.'
                        }
                    },
                    color: Highcharts.getOptions().colors[1],
                    data: arrayMun
                }]
            });
        
        })();
    },



    initGrafico7: function () {

        
        (async () => {

            // Cargar el archivo topo JSON de Colombia
            const topology = await fetch(
                'https://code.highcharts.com/mapdata/countries/co/co-all.topo.json'
            ).then(response => response.json());
        
            // Definir los datos de tasa de desempleo para cada departamento
            const departments = [
                { ucName: 'SAN ANDRÉS Y PROVIDENCIA', value: 12.5 },
                { ucName: 'CAUCA', value: 9.7 },
                { ucName: 'NARIÑO', value: 15.3 },
                { ucName: 'CHOCÓ', value: 0},
                { ucName: 'TOLIMA', value: 20.9 },
                { ucName: 'CAQUETÁ', value: 7.5 },
                { ucName: 'HUILA', value: 9.2 },
                { ucName: 'PUTUMAYO', value: 10.0 },
                { ucName: 'AMAZONAS', value: 6.8 },
                { ucName: 'BOLÍVAR', value: 11.1 },
                { ucName: 'VALLE DEL CAUCA', value: 9.3 },
                { ucName: 'SUCRE', value: 8.4 },
                { ucName: 'ATLÁNTICO', value: 11.0 },
                { ucName: 'CESAR', value: 10.7 },
                { ucName: 'LA GUAJIRA', value: 7.9 },
                { ucName: 'MAGDALENA', value: 9.8 },
                { ucName: 'ARAUCA', value: 8.6 },
                { ucName: 'NORTE DE SANTANDER', value: 9.5 },
                { ucName: 'CASANARE', value: 7.2 },
                { ucName: 'GUAVIARE', value: 6.9 },
                { ucName: 'META', value: 11.7 },
                { ucName: 'VAUPÉS', value: 5.9 },
                { ucName: 'VICHADA', value: 6.3 },
                { ucName: 'ANTIOQUIA', value: 10.4 },
                { ucName: 'CÓRDOBA', value: 9.0 },
                { ucName: 'BOYACÁ', value: 8.5 },
                { ucName: 'SANTANDER', value: 7.8 },
                { ucName: 'CALDAS', value: 8.1 },
                { ucName: 'CUNDINAMARCA', value: 9.4 },
                { ucName: 'BOGOTA', value: 11.5 },
                { ucName: 'RISARALDA', value: 7.7 },
                { ucName: 'QUINDÍO', value: 8.3 },
                { ucName: 'GUAINÍA', value: 60.5 }
            ];
        
            // Preparar datos del mapa para unirlos
            topology.objects.default.geometries.forEach(function (g) {
                if (g.properties && g.properties.name) {
                    g.properties.ucName = g.properties.name.toUpperCase();
                }
            });
        
            // Inicializar el gráfico
            Highcharts.mapChart('container7', {
        
                title: {
                    text: '',
                    align: ''
                },
        
                subtitle: {
                    text: '',
                    align: ''
                },
        
                mapNavigation: {
                    enabled: true,
                    enableButtons: false
                },
        
                xAxis: {
                    labels: {
                        enabled: false
                    }
                },
        
                colorAxis: {
                    labels: {
                        format: '{value}%'
                    },
                    stops: [
                        [0, '#188e2a'], // Verde
                        [0.5, '#fee401'], // Amarillo
                        [0.9, '#df1309'] // Rojo
                    ],
                    min: 0,
                    max: 20 // Ajusta según el rango de tus datos de desempleo
                },
        
                series: [{
                    mapData: topology,
                    data: departments,
                    joinBy: 'ucName',
                    name: 'Tasa de Desempleo',
                    dataLabels: {
                        enabled: true,
                        format: '{point.properties.name}',
                        style: {
                            fontSize: '10px'
                        }
                    },
                    tooltip: {
                        valueSuffix: '%'
                    }
                }, {
                    // Las líneas de conexión
                    type: 'mapline',
                    data: Highcharts.geojson(topology, 'mapline'),
                    color: 'silver',
                    accessibility: {
                        enabled: false
                    }
                }]
            });
        
        })();

    },


    pintarMuns: function (data) {
        Highcharts.mapChart("container9", {
            
            title: {
                text: "",
            },

            subtitle: {
                text: "",
            },

            mapNavigation: {
                enabled: true,
                buttonOptions: {
                    verticalAlign: "bottom",
                },
            },

            plotOptions: {
                series: {
                    events: {
                        click: function (event) {
                            console.log(event.point);
                        },
                    },
                },
            },

            colorAxis: {
                min: 0,
                max: 34,
                stops: [
                    [0.2, "#188e2a"], // Green
                    [0.5, "#fee401"], // Yellow
                    [1, "#df1309"], // Red
                ],
                // minColor: 'green',
                // maxColor: 'red'
            },

            series: [
                {
                    data: data,
                    name: "Random data",
                    states: {
                        hover: {
                            color: "#BADA55",
                        },
                    },
                    dataLabels: {
                        enabled: true,
                        format: "{point.name}",
                    },
                },
            ],
        });
    },

    initGrafico8: function () {
        let me = this;
        let dataMunicipios = DepMunColombia();

        const drilldown = async function (e) {
            if (!e.seriesOptions) {
                const chart = this;
                const dptoCode = e.point.properties.DPTO_CCDGO;

                // Filtrar los municipios correspondientes al departamento seleccionado
                const municipiosTopoJSON = {
                    type: "Topology",
                    objects: {
                        municipios: {
                            type: "GeometryCollection",
                            geometries:
                                dataMunicipios.objects.MGN_ANM_MPIOS.geometries.filter(
                                    (municipios) => municipios.properties.DPTO_CCDGO === dptoCode
                                ),
                        },
                    },
                    arcs: dataMunicipios.arcs,
                    transform: dataMunicipios.transform,
                };

                // Convertir TopoJSON a GeoJSON
                const municipiosGeoJSON = topojson.feature(
                    municipiosTopoJSON,
                    municipiosTopoJSON.objects.municipios
                );

                // Convertir GeoJSON a un formato que Highcharts pueda utilizar
                const data = Highcharts.geojson(municipiosGeoJSON);

                // Añadir un valor a cada punto ??????????????????
                data.forEach((d, i) => {
                    d.value = i;
                });

                me.pintarMuns(data);

                // chart.addSeriesAsDrilldown(e.point, {
                //     name: e.point.name,
                //     data,
                //     dataLabels: {
                //     enabled: true,
                //     format: '{point.properties.MPIO_CNMBR}'
                //     }
                // });
            }
        };

        (async () => {
            // Convertir el TopoJSON de los departamentos a GeoJSON
            const departamentosGeoJSON = topojson.feature(
                dataMunicipios,
                dataMunicipios.objects.MGN_ANM_DPTOS
            );
            //

            if (departamentosGeoJSON) {
                const data = Highcharts.geojson(departamentosGeoJSON);

                console.log(departamentosGeoJSON);

                
                data.forEach((d, i) => {
                    d.drilldown = d.properties["DPTO_CCDGO"];
                    d.value = i; // Non-random bogus data
                });

                Highcharts.mapChart("container8", {
                    chart: {
                        events: {
                            drilldown,
                        },
                    },

                    title: {
                        text: "",
                    },

                    colorAxis: {
                        min: 0,
                        minColor: "#E6E7E8",
                        maxColor: "#005645",
                    },

                    mapNavigation: {
                        enabled: true,
                        buttonOptions: {
                            verticalAlign: "bottom",
                        },
                    },

                    plotOptions: {
                        map: {
                            states: {
                                hover: {
                                    color: "#EEDD66",
                                },
                            },
                        },
                    },

                    series: [
                        {
                            data,
                            name: "Colombia",
                            dataLabels: {
                                enabled: true,
                                format: "{point.properties.DPTO_CNMBR}",
                            },
                        },
                    ],

                    drilldown: {
                        activeDataLabelStyle: {
                            color: "#FFFFFF",
                            textDecoration: "none",
                            textOutline: "1px #000000",
                        },
                        breadcrumbs: {
                            floating: true,
                        },
                        drillUpButton: {
                            relativeTo: "spacingBox",
                            position: {
                                x: 0,
                                y: 60,
                            },
                        },
                    },
                });
            } else {
                console.log("Error al cargar los datos del mapa.");
            }
        })();
    },


}



