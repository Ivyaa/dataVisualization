//Data utilities
//遇到NA就設定為undefined, 要不然就維持原本的字串
const parseNA = string => (string ==='NA' ? undefined:string);
//日期處理
// const parseDate = string => d3.timeParse('%Y')(string);


function type(d){                                       // d為每個房間的元素 (stuct)
    return{     //  資料的物件
        country_territory: parseNA(d['Country/Territory']), 
        Code: parseNA(d.Code),
        Year: +d.Year,
        Meningitis: +d.Meningitis,                       // + 變數字
        Alzheimer_s_Disease_and_other_dementias: +d["Alzheimer's Disease and Other Dementias"],
        Parkinson_s_Disease: +d["Parkinson's Disease"],
        Malaria:+d.Malaria,
        Drowning: +d.Drowning,
        Interpersonal_Violence: +d["Interpersonal Violence"],
        Maternal_disorders: +d["Maternal Disorders"],
        HIV_AIDS: +d["HIV/AIDS"],
        Drug_use_disorders: +d["Drug Use Disorders"],
        Tuberculosis: +d.Tuberculosis,
        Cardiovascular_diseases: +d["Cardiovascular Diseases"],
        Lower_respiratory_infections: +d["Lower Respiratory Infections"],
        Neonatal_Disorders: +d["Neonatal Disorders"],
        Alcohol_Use_Disorders: +d['Alcohol Use Disorders'],
        Self_Harm: +d['Self-harm'],
        Exposure_to_Forces_of_Nature: +d['Exposure to Forces of Nature'], 
        Environmental_Heat_and_Cold_Exposure: +d['Environmental Heat and Cold Exposure'],
        Neoplasms: +d.Neoplasms,
        Conflict_and_Terrorism: +d['Conflict and Terrorism'],
        Diabetes_Mellitus: +d['Diabetes Mellitus'],
        Chronic_Kidney_Disease: +d['Chronic Kidney Disease'],
        poisonings: +d.Poisonings,
        Protein_Energy_Malnutrition: +d['Protein-Energy Malnutrition'],
        Road_Injuries: +d['Road Injuries'],
        Chronic_Respiratory_Diseases: +d['Chronic Respiratory Diseases'],
        Cirrhosis_and_Other_Chronic_Liver_Diseases: +d['Cirrhosis and Other Chronic Liver Diseases'],
        Digestive_Diseases: +d['Digestive Diseases'],
        Acute_Hepatitis: +d['Acute Hepatitis'],
    }

}

// 刻度顯示格式轉換
function formatTicks(d){
    return d3.format('~s')(d)
    .replace('M','mil')
    .replace('G','bil')
    .replace('T','tri')
}





/*
 *  找台灣各年死因排行
 */

//Data selection
function filterData_TW(data){     
    return data.filter(
        d=>{
            
            return (
                d.country_territory == "Taiwan"  // && d.Year == time_y
            );
            
        }
    );
}


function setupCanvas_TW(barChartData,TW_deathsClean,width,height){
    //一開始預設指標是 2010
    let metric ='2010';

    function click(){
        metric =this.dataset.name;
        const thisData=chooseData(metric, TW_deathsClean);
        console.log(thisData);
        update(thisData);
    }
    d3.selectAll('button').on('click',click);

    function update(data){
        console.log(data);
        //Update Scale
        xMax = d3.max(data, d=>d.death_cause_num);
        xScale_v3 = d3.scaleLinear([0, xMax],[0, chart_width]);

        yScale=d3.scaleBand().domain(data.map(d=>d.death_cause))
        .rangeRound([0, chart_height]).paddingInner(0.25);

        //Transition Settings
        const defaultDelay = 1000;
        const transitionDelay = d3.transition().duration(defaultDelay);

        //Update axis
        xAxisDraw.transition(transitionDelay).call(xAxis.scale(xScale_v3));
        yAxisDraw.transition(transitionDelay).call(yAxis.scale(yScale));

        //Update Header
        header.select('tspan').text(`In ${metric} , Death of causes rank in Taiwan `);

        //Update Bar
        bars.selectAll('.bar').data(data, d=>d.death_cause).join(
            enter => {
                enter.append('rect').attr('class', 'bar')
                .attr('x',0).attr('y',d=>yScale(d.death_cause))
                .attr('height',yScale.bandwidth())
                .style('fill','lightcyan')
                .transition(transitionDelay)
                .delay((d,i)=>i*20)
                .attr('width',d=>xScale_v3(d.death_cause_num))
                .style('fill','#ffb73b');
            },
            update => {
                update.transition(transitionDelay)
                .delay((d,i)=>i*20)
                .attr('y',d=>yScale(d.death_cause))
                .attr('width',d=>xScale_v3(d.death_cause_num));
            },
            exit => {
                exit.transition().duration(defaultDelay/2)
                .style('fill-opacity',0)
                .remove();
            }
        );
    }
    const svg_width = width;
    const svg_height = height;
    const chart_margin = {top:70,right:10,bottom:20,left:230};
    const chart_width = svg_width-(chart_margin.left+chart_margin.right);
    const chart_height = svg_height-(chart_margin.top+chart_margin.bottom);
    
    const this_svg = d3.select('.bar-chart-container')               // 這才是把上面加到網頁的東東
        .append('svg').attr('width', svg_width).attr('height',svg_height)
        .append('g').attr('transform',`translate(${chart_margin.left},${chart_margin.top})`);     
        //  `` 為js中可變印出內容 （原用+串接）
        // .attr('transform','translate('+chart_margin.left+','+chart_margin.top+')');

    //V3.Short writing 
    let xMax=d3.max(barChartData, d=>d.death_cause_num);      //.
    let xScale_v3 =d3.scaleLinear([0,xMax],[0, chart_width]);
    // debugger; 

    //垂直空間的分配-平均分布
    let yScale = d3.scaleBand().domain(barChartData.map(d=>d.death_cause))    //death_cause
                                .rangeRound([0, chart_height])
                                .paddingInner(0.25);        //      bar & next bar 空隙

    const bars =this_svg.append('g').attr('class','bars');


    //Draw header
    let header = this_svg.append('g').attr('class','bar-header')
                            .attr('transform',`translate(0,${-chart_margin.top/2})`)
                            .append('text');                  
    header.append('tspan').text(' IN xxx , Death of causes rank in Taiwan').style('font-size','0.8em');
    
    //tickSizeInner: the length of the tick lines
    //tickSizeOuter: the length of the square ends of the domain path
    // formatTicks  刻度顯示格式轉換
    let xAxis=d3.axisTop(xScale_v3).tickFormat(formatTicks).tickSizeInner(-chart_height).tickSizeOuter(0);
    let xAxisDraw=this_svg.append('g').attr('class','x axis').call(xAxis);
    let yAxis=d3.axisLeft(yScale).tickSize(0);
    let yAxisDraw=this_svg.append('g').attr('class','y axis').call(yAxis);

    yAxisDraw.selectAll('text').attr('dx','-0.6em');
    update(barChartData);

    const tip = d3.select('.tooltip');

    function mouseover(e){
        const thisBarData = d3.select(this).data()[0];
        const bodyData = [
            ['death toll:', formatTicks(thisBarData.death_cause_num)]
        ]


        tip.style('left', (e.clientX+15)+'px')
            .style('top', e.clientY+'px')
            .transition() //切換bar會較溫和, 可再調整transition預設值
            .style('opacity', 0.98);

        tip.select('h3').html(`${thisBarData.death_cause}`);
        // tip.select('h4').html(`death toll: ${thisBarData.death_cause_num}`);

        d3.select('.tip-body').selectAll('p').data(bodyData)
        .join('p').attr('class','tip-info').html(d => `${d[0]} : ${d[1]}`);
    }

    function mousemove(e) {
        tip.style('left', (e.clientX+15) + 'px')
            .style('top', e.clientY + 'px');

    }

    function mouseout(e) {
        tip.transition()
        .style('opacity', 0);
    }

    d3.selectAll('.bar')
        .on('mouseover', mouseover)
        .on('mousemove', mousemove)
        .on('mouseout', mouseout);
}


function prepareBarChartData_TW(data){
    dataMap = data.map(function(d){
        return [
            // Array[0]
            ["meningitis","alzheimer_s_disease_and_other_dementias", 'parkinson_s_disease',
             'malaria', 'drowning','interpersonal_violence',
            'maternal_disorders', 'hiv_aids','drug_use_disorders', 'tuberculosis', 
            'cardiovascular_diseases','lower_respiratory_infections', 'neonatal_disorders',
            'alcohol_use_disorders', 'self_harm', 'exposure_to_forces_of_nature',
            'environmental_heat_and_cold_exposure','neoplasms', 
            'conflict_and_terrorism', 'diabetes_mellitus','chronic_kidney_disease', 
            'poisonings', 'protein_energy_malnutrition','road_injuries', 
            'chronic_respiratory_diseases','cirrhosis_and_other_chronic_liver_diseases', 
            'digestive_diseases', 'acute_hepatitis'],


            // Array[1]
            [d.Meningitis,d.Alzheimer_s_Disease_and_other_dementias,d.Parkinson_s_Disease,
            d.Malaria,d.Drowning,d.Interpersonal_Violence,d.Maternal_disorders,d.HIV_AIDS,
            d.Drug_use_disorders,d.Tuberculosis,d.Cardiovascular_diseases,d.Lower_respiratory_infections,
            d.Neonatal_Disorders,d.Alcohol_Use_Disorders,d.Self_Harm,d.Exposure_to_Forces_of_Nature,
            d.Environmental_Heat_and_Cold_Exposure,d.Neonatal_Disorders,
            d.Conflict_and_Terrorism,d.Diabetes_Mellitus,d.Chronic_Kidney_Disease,d.poisonings,
            d.Protein_Energy_Malnutrition,d.Road_Injuries,d.Chronic_Respiratory_Diseases,
            d.Cirrhosis_and_Other_Chronic_Liver_Diseases,d.Digestive_Diseases,
            d.Acute_Hepatitis],
            // .map["meningitis",d.Meningitis],
            // ["alzheimer_s_disease_and_other_dementias",d.Alzheimer_s_Disease_and_other_dementias]     
        ]; 
    })
    const dataArray=[];
    for(var i=0; i < 31; i++){
        data=d3.map(dataMap, d=>({death_cause:d[0][i], death_cause_num:d[1][i]}));
        // debugger;
        dataArray.push(data[0]);
    }
    return dataArray;
}

function ready_TW(deaths){
    const TW_deathsClean=filterData_TW(deaths);
    console.log(TW_deathsClean);

    const YearsData = chooseData("2010",deaths);
    console.log(YearsData);
    setupCanvas_TW(YearsData,TW_deathsClean,700,600);
}



//Load Data
d3.csv('data/cause_of_deaths.csv',type).then(   //,death_cause1,death_cause2
    res=>{
        // console.log(res);
        ready_TW(res);
    }
)

function chooseData(metric, deaths){
    const thisData = deaths.filter(
        d=>{
            return (
                d.Year == metric
            );    
        }
    );
    const barChartData=prepareBarChartData_TW(thisData).sort(       //
        (a,b)=>{
            return d3.descending(a.death_cause_num,b.death_cause_num);      // a,b 排序為大至小， a,b 相反為小至大
        }
        
    ).filter((d,i)=>i<15);
    return barChartData;
}