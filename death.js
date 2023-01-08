// js
// 先取資料
let data1 = []
async function getData() {
  dataGet = await d3.csv('data/aids.csv')
  data1 = dataGet
  drawChart()
};
getData()

// RWD
function drawChart(){
        // 刪除原本的svg.charts，重新渲染改變寬度的svg
        //d3.select('.chart svg').remove();

        const rwdSvgWidth = 800, rwdSvgHeight = rwdSvgWidth*0.8 ,margin = 60
        // RWD 的svg 寬高
        // const rwdSvgWidth = parseInt(d3.select('.chart').style('width')),
        //         rwdSvgHeight = rwdSvgWidth*0.8,
        //         margin = 60

        const svg = d3.select('#chart111')
                        .append('svg')
                        .attr('width', rwdSvgWidth)
                        .attr('height', rwdSvgHeight);

        // map 資料集
        const xData = data1.map((i) => i.Year);
        const yData = data1.map((i) => i.people);
        console.log(yData)

        // 設定要給 X 軸用的 scale 跟 axis
        const xScale = d3.scaleLinear()
                        .domain(d3.extent(xData))
                        .range([margin, rwdSvgWidth - margin]) // 寬度
                        .nice()

        // rwd X軸的刻度
        const xAxis = d3.axisBottom(xScale)
                        .ticks(8)
                        .tickFormat(d => d )

        // 呼叫繪製x軸、調整x軸位置
        const xAxisGroup = svg.append("g")
                                .call(xAxis)
                                .attr("transform", `translate(0,${rwdSvgHeight - margin})`)

        // 設定要給 Y 軸用的 scale 跟 axis
        const yScale = d3.scaleLinear()
                        .domain([0, 350000])
                        //.domain(d3.extent(yData))
                        .range([ rwdSvgHeight - margin,margin]) // 數值要顛倒，才會從低往高排
                        .nice()
        //console.log(d3.extent(yData))
        //console.log(sumName)
        const yAxis = d3.axisLeft(yScale)

        // 呼叫繪製y軸、調整y軸位置
        const yAxisGroup = svg.append("g")
                                .call(yAxis)
                                .attr("transform", `translate(${margin},0)`)

        // 把資料按照 name 分組
        const sumName = d3.group(data1, d => d.Country);
        

        const color = d3.scaleOrdinal()
                        .domain(data1.map(d=>d.item))
                        .range(d3.schemeCategory10);

        // 開始建立折線圖
        const line = svg.selectAll('.line')
                        .data(sumName)
                        .join('path')
                        .attr("fill", "none")
                        .attr("stroke", d => color(d))
                        .attr("stroke-width", 3)
                        .attr("d", d => {
                                return d3.line()
                                        .x((d) => xScale(d.Year))
                                        .y((d) => yScale(d.people))
                                        (d[1]) // 只取資料的部分帶入
                        })
        // 建立浮動的資料標籤
        const nameTag = d3.select('#chart111')
                .append('div')
                .attr('class', 'nameTag')
                .style('position', 'absolute')
                .style("opacity", 0)
                .style("background-color", "black")
                .style("border-radius", "5px")
                .style("padding", "10px")
                .style("color", "white")
        line.style('cursor', 'pointer')
                .on('mouseover', handleMouseover)
      
        // 滑鼠事件
        function handleMouseover(d){
                const pt = d3.pointer(event, this)
        // console.log(pt) 
        // console.log(d.target.__data__[0])
      
                nameTag.style("opacity",1)
                        .html(d.target.__data__[0])
                        .style('left', (pt[0]+10) + 'px')
                        .style('top', (pt[1]+ 10) + 'px')
      }
                 
}


let data2 = []
async function getData2() {
  dataGet = await d3.csv('data/card.csv')
  data2 = dataGet
  drawChart2()
};
getData2()

// RWD
function drawChart2(){
        // 刪除原本的svg.charts，重新渲染改變寬度的svg
        //d3.select('.chart2 svg').remove();

        const rwdSvgWidth = 800, rwdSvgHeight = rwdSvgWidth*0.8 ,margin = 60
        // RWD 的svg 寬高
        // const rwdSvgWidth = parseInt(d3.select('.chart').style('width')),
        //         rwdSvgHeight = rwdSvgWidth*0.8,
        //         margin = 60

        const svg = d3.select('#chart222')
                        .append('svg')
                        .attr('width', rwdSvgWidth)
                        .attr('height', rwdSvgHeight);

        // map 資料集
        const xData = data2.map((i) => i.Year);
        const yData = data2.map((i) => i.people);
        console.log(yData)

        // 設定要給 X 軸用的 scale 跟 axis
        const xScale = d3.scaleLinear()
                        .domain(d3.extent(xData))
                        .range([margin, rwdSvgWidth - margin]) // 寬度
                        .nice()

        // rwd X軸的刻度
        const xAxis = d3.axisBottom(xScale)
                        .ticks(8)
                        .tickFormat(d => d )

        // 呼叫繪製x軸、調整x軸位置
        const xAxisGroup = svg.append("g")
                                .call(xAxis)
                                .attr("transform", `translate(0,${rwdSvgHeight - margin})`)

        // 設定要給 Y 軸用的 scale 跟 axis
        const yScale = d3.scaleLinear()
                        .domain([0, 5000000])
                        //.domain(d3.extent(yData))
                        .range([ rwdSvgHeight - margin,margin]) // 數值要顛倒，才會從低往高排
                        .nice()
        console.log(margin)
        //console.log(sumName)
        const yAxis = d3.axisLeft(yScale)

        // 呼叫繪製y軸、調整y軸位置
        const yAxisGroup = svg.append("g")
                                .call(yAxis)
                                .attr("transform", `translate(${margin},0)`)

        // 把資料按照 name 分組
        const sumName = d3.group(data2, d => d.Country );
        

        const color = d3.scaleOrdinal()
                        .domain(data2.map(d=>d.item))
                        .range(d3.schemeCategory10);

        // 開始建立折線圖
        const line = svg.selectAll('.line')
                        .data(sumName)
                        .join('path')
                        .attr("fill", "none")
                        .attr("stroke", d => color(d))
                        .attr("stroke-width", 3)
                        .attr("d", d => {
                                return d3.line()
                                        .x((d) => xScale(d.Year))
                                        .y((d) => yScale(d.people))
                                        (d[1]) // 只取資料的部分帶入
                        })
        // 建立浮動的資料標籤
        const nameTag = d3.select('#chart222')
                .append('div')
                .attr('class', 'nameTag')
                .style('position', 'absolute')
                .style("opacity", 0)
                .style("background-color", "black")
                .style("border-radius", "5px")
                .style("padding", "10px")
                .style("color", "white")
        line.style('cursor', 'pointer')
                .on('mouseover', handleMouseover)
      
        // 滑鼠事件
        function handleMouseover(d){
                const pt = d3.pointer(event, this)
        // console.log(pt) 
        // console.log(d.target.__data__[0])
      
                nameTag.style("opacity",1)
                        .html(d.target.__data__[0])
                        .style('left', (pt[0]+10) + 'px')
                        .style('top', (pt[1]+ 10) + 'px')
      }
                 
}
// d3.select(window).on('resize', drawChart);

let data3 = []
async function getData3() {
  dataGet = await d3.csv('data/diabetes.csv')
  data3 = dataGet
  drawChart3()
};
getData3()

// RWD
function drawChart3(){
        // 刪除原本的svg.charts，重新渲染改變寬度的svg
        //d3.select('.chart2 svg').remove();

        const rwdSvgWidth = 800, rwdSvgHeight = rwdSvgWidth*0.8 ,margin = 60
        // RWD 的svg 寬高
        // const rwdSvgWidth = parseInt(d3.select('.chart').style('width')),
        //         rwdSvgHeight = rwdSvgWidth*0.8,
        //         margin = 60

        const svg = d3.select('#chart333')
                        .append('svg')
                        .attr('width', rwdSvgWidth)
                        .attr('height', rwdSvgHeight);

        // map 資料集
        const xData = data3.map((i) => i.Year);
        const yData = data3.map((i) => i.people);
        console.log(yData)

        // 設定要給 X 軸用的 scale 跟 axis
        const xScale = d3.scaleLinear()
                        .domain(d3.extent(xData))
                        .range([margin, rwdSvgWidth - margin]) // 寬度
                        .nice()

        // rwd X軸的刻度
        const xAxis = d3.axisBottom(xScale)
                        .ticks(8)
                        .tickFormat(d => d )

        // 呼叫繪製x軸、調整x軸位置
        const xAxisGroup = svg.append("g")
                                .call(xAxis)
                                .attr("transform", `translate(0,${rwdSvgHeight - margin})`)

        // 設定要給 Y 軸用的 scale 跟 axis
        const yScale = d3.scaleLinear()
                        .domain([0, 5000000])
                        //.domain(d3.extent(yData))
                        .range([ rwdSvgHeight - margin,margin]) // 數值要顛倒，才會從低往高排
                        .nice()
        console.log(margin)
        //console.log(sumName)
        const yAxis = d3.axisLeft(yScale)

        // 呼叫繪製y軸、調整y軸位置
        const yAxisGroup = svg.append("g")
                                .call(yAxis)
                                .attr("transform", `translate(${margin},0)`)

        // 把資料按照 name 分組
        const sumName = d3.group(data3, d => d.Country );
        

        const color = d3.scaleOrdinal()
                        .domain(data3.map(d=>d.item))
                        .range(d3.schemeCategory10);

        // 開始建立折線圖
        const line = svg.selectAll('.line')
                        .data(sumName)
                        .join('path')
                        .attr("fill", "none")
                        .attr("stroke", d => color(d))
                        .attr("stroke-width", 3)
                        .attr("d", d => {
                                return d3.line()
                                        .x((d) => xScale(d.Year))
                                        .y((d) => yScale(d.people))
                                        (d[1]) // 只取資料的部分帶入
                        })
        // 建立浮動的資料標籤
        const nameTag = d3.select('#chart222')
                .append('div')
                .attr('class', 'nameTag')
                .style('position', 'absolute')
                .style("opacity", 0)
                .style("background-color", "black")
                .style("border-radius", "5px")
                .style("padding", "10px")
                .style("color", "white")
        line.style('cursor', 'pointer')
                .on('mouseover', handleMouseover)
      
        // 滑鼠事件
        function handleMouseover(d){
                const pt = d3.pointer(event, this)
        // console.log(pt) 
        // console.log(d.target.__data__[0])
      
                nameTag.style("opacity",1)
                        .html(d.target.__data__[0])
                        .style('left', (pt[0]+10) + 'px')
                        .style('top', (pt[1]+ 10) + 'px')
      }
                 
}