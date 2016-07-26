var w=$(".barchartcontainer").width();
var h =$(".barchartcontainer").height();
 console.log("width is :"+w);
console.log("height is :"+h);


var margin = {top: 0, right: 20, bottom: 10, left: 20},
        width = w - margin.left - margin.right,
        height = h - margin.top - margin.bottom;

var compliants = function(zip){
        d3.csv("data/callsfiltered1.csv",function(calls){
            data = calls.map(function(d){
                call = +(d[''+zip]);
                ct =  (d['BoroCT2010']);
                return {"callsmade":call,"Cencus":ct};
            })
            bars(data);
        })
        }
        
        var percent = d3.format('%');

        var bars = function(data){
        
            
            var max =d3.max(data,function(d){
                   return d['callsmade'];
                   })
                     
             var sorted = data.sort(function(x, y){
               return d3.descending(x.callsmade, y.callsmade);
            });
            
           //console.log(sorted)
             var tip = d3.tip()
                      .attr('class', 'd3-tip')
                      .offset([-8, 0])
                      .html(function(d) {
                        return "<strong>Complain Type:</strong> <span style='color:red'>" +d['Cencus']+":</span><strong>"+d['callsmade']+'</strong>';
                      })
             
             var vis = d3.select("#barcharta");
             var bars = vis.selectAll("rect.bar")
                        .data(sorted)
             
             
            vis.call(tip);
            
            var result = $.grep(data, function(e){ return e["callsmade"] == (max); });
           
            //console.log(function(d){return d['Cencus']})
            bars.enter()
                .append("svg:rect")
                .attr("class", "bar")
                 .on('mouseover', tip.show)
                .on('mouseout', tip.hide)
                //.on('mouseclick',mapupdate(function(d){return d['Census'];}));
            bars.on('click',function(d){
                console.log(d)
                mapupdate(d['Cencus']);
            })
            bars.exit()
                .remove()
            
            
            
            var h = 7;
            bars
                .attr("stroke-width", 4)
                .attr("width", h)  
                 .attr("x", function(d, i) {
                        if(i<20){
                       return (i * 12);
                        }
                    })
                .transition()
                    .delay(200)
                    .ease("exp")
                    .attr("height", function(d,i) 
                          {
                    if(i<20){
                    //console.log("top ten:"+max);
                    return ((d.callsmade/max)*height);
                    }
                    })
                    .attr("y", function(d, i){
                        if(i<20){
                    return (height - (((d.callsmade/max)*height)));
                        }
                    })
            
             
        }
        
    function initbar()
    {
 
        //setup the svg
        var svg = d3.select("#svg4")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .attr("preserveAspectRatio", "xMinYMid")
            .attr("viewBox", "0 0 300 200")
            .classed("svg-container", true)
            .classed("svg-content-responsive", true); 
        
        
   //class to make it responsive
            
        //console.log("svg", svg)
        svg.append("svg4:rect")
            .attr("width", "100%")
            .attr("height", "100%")
            .attr("stroke", "none")
            .attr("fill", "none")
            

        svg.append("svg4:g")
            .attr("id", "barcharta")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


        
        
    }