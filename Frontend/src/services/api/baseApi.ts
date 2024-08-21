import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { ResponseModel } from "../../types/responseModelType";

export class BaseApi<TEntity, TCreateDTO, TUpdateDTO> {
    constructor(_api: AxiosInstance, _entityName: string) {
        this.api = _api;
        this.entityName = _entityName;
    }

    private api: AxiosInstance;
    private entityName: string;
  
    get(config?: AxiosRequestConfig) {
        return this.api.get<ResponseModel<TEntity[]>>(this.entityName, config);
    }

    post(data: TCreateDTO, config?: AxiosRequestConfig) {
        return this.api.post<TEntity, AxiosResponse<ResponseModel<TEntity>>, TCreateDTO>(this.entityName, data, config);
    }

    patch(data: TUpdateDTO, config?: AxiosRequestConfig) {
        return this.api.patch<TEntity, AxiosResponse<ResponseModel<TEntity>>, TUpdateDTO>(this.entityName, data, config);
    }
    
    delete(config?: AxiosRequestConfig) {
        return this.api.delete(this.entityName, config);
    }
}