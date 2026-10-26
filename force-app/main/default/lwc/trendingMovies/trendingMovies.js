
import { LightningElement } from 'lwc';

import pursuit from '@salesforce/resourceUrl/pursuit';
import goodwillhunting from '@salesforce/resourceUrl/goodwillhunting';
import fightclub from '@salesforce/resourceUrl/fightclub';
import spiderman1 from '@salesforce/resourceUrl/spiderman1';

export default class TrendingMovies extends LightningElement {
    pursuitImage = pursuit;
    goodwillImage = goodwillhunting;
    fightClubImage = fightclub;
    spidermanImage = spiderman1;
}
