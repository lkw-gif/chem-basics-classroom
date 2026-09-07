'use client';

import { ArrowRight } from 'lucide-react';
import { asset, useTranslateTree } from './i18n';
import Model from './model';

export default function WaterZoomStory() {
  const tr = useTranslateTree();

  return tr(
    <>
      <div className="section-label">
        <h2>由一個分子，看到一整杯水</h2>
        <span>同一種分子，很多很多個。</span>
      </div>
      <div className="zoom-story">
        <figure>
          <img src={asset('images/water.jpg')} alt="一杯水的示意照片" loading="lazy" decoding="async" width={960} height={720} />
          <figcaption>一杯水</figcaption>
        </figure>
        <ArrowRight className="zoom-arrow" />
        <div>
          <Model kind="sample:water" compact label="很多個相同的水分子" />
          <p>放大看：很多個 H₂O</p>
        </div>
        <ArrowRight className="zoom-arrow" />
        <div>
          <Model kind="H2O" compact />
          <p>再看一個：2 H ＋ 1 O</p>
        </div>
      </div>
    </>
  );
}
