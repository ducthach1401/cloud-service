import { DomainModel } from 'src/core/models/domain-model';

export class PicfitModel extends DomainModel {
  public readonly operation: string;
  public readonly height: number | undefined;
  public readonly weight: number | undefined;

  constructor(
    operation: string,
    height: number | undefined,
    weight: number | undefined,
  ) {
    super();
    this.operation = operation;
    this.height = height;
    this.weight = weight;
  }

  toJson(showHidden: boolean): Record<string, any> {
    return this.filterHiddenIfNeed(
      {
        op: this.operation,
        h: this.height,
        w: this.weight,
      },
      showHidden,
    );
  }
}
