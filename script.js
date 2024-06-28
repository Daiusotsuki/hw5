$(function() {
    const letterValues = {
        A: 1, B: 3, C: 3, D: 2, E: 1, F: 4, G: 2, H: 4,
        I: 1, J: 8, K: 5, L: 1, M: 3, N: 1, O: 1, P: 3,
        Q: 10, R: 1, S: 1, T: 1, U: 1, V: 4, W: 4, X: 8,
        Y: 4, Z: 10, Blank: 0
    };

    // Initialize a row of the Scrabble board and mark bonus squares
    const bonusSquares = [
        '', '', '', 'double-word', '', '', '', 'triple-word', '', '', '', 'double-word', '', '', ''
    ];

    for (let i = 0; i < 15; i++) {
        $('#scrabble-board').append('<div class="droppable" data-bonus="' + bonusSquares[i] + '"></div>');
    }

    // Initialize letter tiles
    const tiles = [
        { letter: 'A', src: 'Scrabble_Tile_A.jpg' },
        { letter: 'B', src: 'Scrabble_Tile_B.jpg' },
        { letter: 'C', src: 'Scrabble_Tile_C.jpg' },
        { letter: 'D', src: 'Scrabble_Tile_D.jpg' },
        { letter: 'E', src: 'Scrabble_Tile_E.jpg' },
        { letter: 'F', src: 'Scrabble_Tile_F.jpg' },
        { letter: 'G', src: 'Scrabble_Tile_G.jpg' },
        { letter: 'H', src: 'Scrabble_Tile_H.jpg' },
        { letter: 'I', src: 'Scrabble_Tile_I.jpg' },
        { letter: 'J', src: 'Scrabble_Tile_J.jpg' },
        { letter: 'K', src: 'Scrabble_Tile_K.jpg' },
        { letter: 'L', src: 'Scrabble_Tile_L.jpg' },
        { letter: 'M', src: 'Scrabble_Tile_M.jpg' },
        { letter: 'N', src: 'Scrabble_Tile_N.jpg' },
        { letter: 'O', src: 'Scrabble_Tile_O.jpg' },
        { letter: 'P', src: 'Scrabble_Tile_P.jpg' },
        { letter: 'Q', src: 'Scrabble_Tile_Q.jpg' },
        { letter: 'R', src: 'Scrabble_Tile_R.jpg' },
        { letter: 'S', src: 'Scrabble_Tile_S.jpg' },
        { letter: 'T', src: 'Scrabble_Tile_T.jpg' },
        { letter: 'U', src: 'Scrabble_Tile_U.jpg' },
        { letter: 'V', src: 'Scrabble_Tile_V.jpg' },
        { letter: 'W', src: 'Scrabble_Tile_W.jpg' },
        { letter: 'X', src: 'Scrabble_Tile_X.jpg' },
        { letter: 'Y', src: 'Scrabble_Tile_Y.jpg' },
        { letter: 'Z', src: 'Scrabble_Tile_Z.jpg' },
        { letter: 'Blank', src: 'Scrabble_Tile_Blank.jpg' }
    ];

    // Randomly add seven letter tiles to the "rack" at initialization
    function dealTiles() {
        $('#tile-rack').empty();
        for (let i = 0; i < 7; i++) {
            const randomTile = tiles[Math.floor(Math.random() * tiles.length)];
            const img = $('<img>').attr('src', randomTile.src).attr('alt', randomTile.letter).css({width: '40px', height: '40px'});
            $('#tile-rack').append(img);
        }
        $('#tile-rack img').draggable({
            revert: 'invalid',
            helper: 'clone'
        });
    }

    // Implement drag-and-drop functionality
    $('.droppable').droppable({
        accept: '#tile-rack img',
        drop: function(event, ui) {
            if ($(this).children('img').length === 0) {
                const tile = ui.helper.clone().css({
                    width: '40px',
                    height: '40px',
                    position: 'relative',
                    top: '0',
                    left: '0'
                });
                $(this).append(tile);
                ui.helper.remove();
            }
        }
    });

    // Initialize letter tiles
    dealTiles();

    // Implement the "deal tiles" button functionality
    $('#deal-tiles').click(dealTiles);

    // Calculate score
    $('#calculate-score').click(function() {
        let totalScore = 0;
        let wordMultiplier = 1;

        $('.droppable').each(function() {
            const tile = $(this).children('img');
            if (tile.length > 0) {
                const letter = tile.attr('alt');
                let letterScore = letterValues[letter];

                const bonus = $(this).data('bonus');
                if (bonus === 'double-word') {
                    wordMultiplier *= 2;
                } else if (bonus === 'triple-word') {
                    wordMultiplier *= 3;
                }

                totalScore += letterScore;
            }
        });

        totalScore *= wordMultiplier;
        alert('Total Score: ' + totalScore);
    });
});
