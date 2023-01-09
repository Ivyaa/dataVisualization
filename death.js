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

        const rwdSvgWidth = 600, rwdSvgHeight = rwdSvgWidth*0.8 ,margin = 60
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




//world sum end

let datasum = []
async function getDatasum() {
// 取資料
dataGet = await d3.csv('data/0108.csv')
datasum = dataGet
console.log(datasum)
drawBarChartsum()
};
getDatasum()

// RWD
function drawBarChartsum(){
// 刪除原本的svg.charts，重新渲染改變寬度的svg
// d3.select('.chart svg').remove();
const rwdSvgWidth = 800, rwdSvgHeight = rwdSvgWidth*0.6 ,margin = 20, marginBottom = 100
// RWD 的svg 寬高
// const rwdSvgWidth = parseInt(d3.select('.chart').style('width')),
//         rwdSvgHeight = rwdSvgWidth,
//         margin = 20,
//         marginBottom = 100

const mysvgall = d3.select('#chartall')
                .append('svg')
                .attr('width', rwdSvgWidth)
                .attr('height', rwdSvgHeight);

// map 資料集
const xData = datasum.map((i) => i['Code']);

// 設定要給 X 軸用的 scale 跟 axis
const xScale = d3.scaleBand()
                .domain(xData)
                .range([margin*2, rwdSvgWidth - margin]) // 寬度
                .padding(0.6)

const xAxis = d3.axisBottom(xScale)

// 呼叫繪製x軸、調整x軸位置
const xAxisGroup = mysvgall.append("g")
                .call(xAxis)
                .attr("transform", `translate(0,${rwdSvgHeight - marginBottom})`)

// 設定要給 Y 軸用的 scale 跟 axis
const yScale = d3.scaleLinear()
                .domain([0, 1])
                .range([rwdSvgHeight - marginBottom, margin])
                .nice() // 補上終點值

const yAxis = d3.axisLeft(yScale)
                .ticks(10)
                .tickSize(3)
                .tickFormat(function (d) {
                //調整標籤樣式
                return `${d*100} %`;
                })

// 呼叫繪製y軸、調整y軸位置
const yAxisGroup = mysvgall.append("g")
                .call(yAxis)
                .attr("transform", `translate(${margin*2},0)`)
// 拉出要分組的資料
const subgroups =  Object.keys(datasum[0]).slice(1)

// 用 d3.stack() 把資料堆疊起來
const stackedData = d3.stack()
                .keys(subgroups)(datasum)
// 設定不同 subgorup bar的顏色
const color = d3.scaleOrdinal()
                .domain(subgroups)
                .range(['#FF4D00','#FFFF00', '#00FF00','#007FFF','#8B00FF'])
//                    .range(['#e41a1c','#377eb8','#4daf4a', '#ffda6b'])


const bar = mysvgall.append('g')
                .selectAll('g')
                .data(stackedData)
                .join('g')
                .attr('fill',  d => color(d.key))
                .selectAll('rect')
                .data(d=>d)
                .join('rect')
                .attr("x", d => xScale(d.data['Code']))
                .attr("y", d => yScale(d[1]))
                .attr("height", d => yScale(d[0]) - yScale(d[1]))
                .attr("width",xScale.bandwidth())
// 加上下方分類標籤
const tagsWrap =  mysvgall.append('g')
.selectAll('g')
.attr('class', 'tags')
.data(subgroups)
.enter()
.append('g')
.attr('transform', "translate(-70,0)")

tagsWrap.append('rect')
.attr('x', (d,i)=> (i+1)*marginBottom*1.3)
.attr('y', rwdSvgHeight-marginBottom/2)
.attr('width', 20)
.attr('height', 20)
.attr('fill', d => color(d))

tagsWrap.append('text')
.attr('x', (d,i)=> (i+1)*marginBottom*1.3)
.attr('y', rwdSvgHeight-10)
.style('fill', '#000')
.style('font-size', '12px')
.style('font-weight', 'bold')
.style("text-anchor", 'middle')
.text(d=>d)
bar.on("mouseover", handleMouseOver)
.on("mouseleave", handleMouseLeave)

// 設定文字標籤
const textTag = mysvgall.append('text')
                .attr('class', 'infoText')
                .style('fill', '#000')
                .style('font-size', '18px')
                .style('font-weight', 'bold')
                .style("text-anchor", 'middle')
                .style('opacity', '0')

function handleMouseOver(d, i){
const pt = d3.pointer(event, mysvgall.node())

d3.select(this)
        .style('opacity', '0.5')

// 加上文字標籤
textTag
        .style('opacity', '1')
        .attr("x",  pt[0])
        .attr('y', pt[1]-20)
//          .text((d.target.__data__[1] - d.target.__data__[0]) )
        .text(((d.target.__data__[1] - d.target.__data__[0])*100).toFixed(1)+"%" )

}

function handleMouseLeave(){
d3.select(this)
        .style('opacity', '1')

textTag.style('opacity', '0')
}

if(window.innerWidth < 780){
tagsWrap.attr('transform', "translate(-70,0)")
}

tagsWrap.append('rect')
.attr('x', (d,i)=> (i+1)*marginBottom*1.3)
.attr('y', rwdSvgHeight-marginBottom/2)
.attr('width', 20)
.attr('height', 20)
.attr('fill', d => color(d))

tagsWrap.append('text')
.attr('x', (d,i)=> (i+1)*marginBottom*1.3)
.attr('y', rwdSvgHeight-10)
.style('fill', '#000')
.style('font-size', '12px')
.style('font-weight', 'bold')
.style("text-anchor", 'middle')
.text(d=>d)
}
