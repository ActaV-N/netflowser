import Container from 'typedi';
import { DataSource } from 'typeorm';
import { TransactionManager } from '@ecubelabs/seed';
import { TypeOrmTransactionManager, dataSourceMap } from '@ecubelabs/seed/typeorm';
import { getConfig } from '~api/config';
import entities from '../../service/entities';

async function initDataSource() {
  const dataSource = new DataSource({
    ...getConfig('/ormconfig'),
    entities,
  });

  await Promise.all([dataSource.initialize()]);

  Container.set({
    id: dataSourceMap,
    value: { default: dataSource },
    global: true,
  });

  Container.set({
    // @ts-ignore
    id: TransactionManager,
    type: TypeOrmTransactionManager,
  });

  return dataSource;
}

export { initDataSource };
