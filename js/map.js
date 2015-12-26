google.maps.event.addDomListener( window, 'load', draw );

var myMap;
var tomatoArray = [
  {
    name: 'ももたろう',
    lat: 33.559706,
    lng: 133.531079
}, {
    name: 'ももたろう2',
    lat: 33.900000,
    lng: 133.000000
}
 ];

function draw() {
  initialize();
  overlayTomato();
}

function initialize() {
  // キャンパスの要素を取得する
  var canvas = document.getElementById( 'map-canvas' );

  // 中心の位置座標を指定する
  var latlng = new google.maps.LatLng( 33.559706, 133.531079 );

  // 地図のオプションを設定する
  var mapOptions = {
    zoom: 9, // ズーム値
    center: latlng, // 中心座標 [latlng]
  };

  // [canvas]に、[mapOptions]の内容の、地図のインスタンス([map])を作成する
  myMap = new google.maps.Map( canvas, mapOptions );
}

function overlayTomato() {
  tomatoArray.forEach( function ( tomato ) {
    // D3jsでトマトの画像を表示
    if ( tomato.lat ) {
      var overlay = new google.maps.OverlayView(); //OverLayオブジェクトの作成
      overlay.onAdd = function () {
        //オーバーレイ設定
        var layer = d3.select( "#map-canvas" ).append( "div" ).attr( "class", "SvgOverlay" );
        var svg = layer.append( "svg" );

        // 緯度経度をpx座標に変換
        var point = this.getProjection().fromLatLngToDivPixel( new google.maps.LatLng( tomato.lat, tomato.lng ) );
        overlay.draw = function () {
          // imageを表示
          svg.selectAll( ".node" )
            .data( [ point ] ).enter()
            .append( "image" )
            .attr( "class", "node" )
            .attr( "x", function ( d ) {
              return d.x;
            } )
            .attr( "y", function ( d ) {
              return d.y;
            } )
            .attr( "width", 100 )
            .attr( "height", 100 )
            .attr( "xlink:href", "img/tomato.jpg" );
          // ブランド名をテキストで表示
          svg.selectAll( "text" )
            .data( [ point ] ).enter()
            .append( "text" )
            .attr( "x", function ( d ) {
              return d.x;
            } )
            .attr( "y", function ( d ) {
              return d.y;
            } )
            .attr( "fill", "orange" )
            .attr( "font-size", "2rem" )
            .text( tomato.name );
        }
        overlay.draw();
      }
      overlay.setMap( myMap );
    }
  } );
}