let url = 'https://raw.githubusercontent.com/lluk4z/AtividadeD3/main/parlam_X_Y.json'
let req = new XMLHttpRequest()

let values = []

let xScale
let yScale

let width = 1200
let height = 400
let padding = 40

let escalaCor = d3.scaleLinear().domain([0,10000]).range(["blue","red"]);

let svg = d3.select('svg')
let tooltip = d3.select('#tooltip')

let drawCanvas = () => {
  svg.attr('width', width)
  svg.attr('height', height)
}

let generateScales = () => {
    
  xScale = d3.scaleLinear()
                      .domain([d3.min(values, (item) => {
                          return item['aX']
                      }) - 1 , d3.max(values, (item) => {
                          return item['aX']
                      }) + 1])
                      .range([padding, width-padding])

  yScale = d3.scaleLinear()
                      .domain([d3.min(values, (item) => {
                          return item['aY']
                      }), d3.max(values, (item) => {
                          return item['aY']
                      })])
                      .range([padding, height-padding])

}


let drawPoints = () => {
  svg.selectAll('circle')
      .data(values)
      .enter()
      .append('circle')
      .attr('class', 'dot')
      .attr("fill",d=>escalaCor(d[1]))
      .attr('r', '20')
      .attr('data-xvalue', (item) => {
        return item['aX']
      })
      .attr('data-yvalue', (item) => {
        return item['aY']
      })
      .attr('cx', (item) => {
        return item['aX'] * 50
      })
      .attr('cy', (item) => {
        //console.log(item['nome'])
        return item['aY'] * 55
      })
      .attr('fill', (item) => {
        if(item['partido'].length == 3){
          return 'blue'
        }
        else if(item['partido'].length > 3){
          return 'red'
        }
        else {
          return 'green'
        }
      })
      .on('mouseover', (item) => {
        tooltip.transition()
                .style('visibility', 'visible')
        
        tooltip.text(item['nome'] + ' - ' + item['partido']);
        console.log(item['nome']);
      })
      .on('mouseout', (item) => {
        tooltip.transition()
                .style('visibility', 'hidden')
      })
      .on('click', function(d) {
        console.log('open tab')
        window.open(
          d.foto,
          '_blank' // <- This is what makes it open in a new window.
        );
      });
}

let generateAxes = () => {
  let xAxis = d3.axisBottom()
}

req.open('GET', url, true)
req.onload = () => {
  values = JSON.parse(req.responseText)
  console.log(values)
  drawCanvas()
  generateScales()
  drawPoints()
  generateAxes()
}

req.send()