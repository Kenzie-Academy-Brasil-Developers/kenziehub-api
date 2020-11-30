import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AlterTechStatusColumn1606570253514 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('techs', 'status')

    await queryRunner.addColumn('techs', new TableColumn({
      name: 'status',
      type: 'varchar',
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('techs', 'status')

    await queryRunner.addColumn('techs', new TableColumn({
      name: 'status',
      type: 'integer',
    }))
  }
}
